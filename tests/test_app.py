import os
import tempfile
import unittest
from pathlib import Path

import app

class JarvisTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.original_db = app.DB_PATH
        app.DB_PATH = Path(self.tmp.name) / 'test.sqlite3'
        app.init_db()
    def tearDown(self):
        app.DB_PATH = self.original_db
        self.tmp.cleanup()
    def test_local_env_boundary(self):
        # Granica §7: bez pliku ustawień nic się nie zmienia, z pliku wchodzą tylko klucze JARVIS_*,
        # a zmienna ustawiona przez właściciela wygrywa.
        env = {}
        app.load_local_env(Path(self.tmp.name) / 'brak.env', env)
        self.assertEqual(env, {})
        f = Path(self.tmp.name) / 'istota.env'
        f.write_text(chr(10).join(['# komentarz', 'JARVIS_LLM_MODEL=claude-sonnet-5-5', 'JARVIS_LLM_API_KEY=', 'PATH=zle', 'JARVIS_PORT=9999']), encoding='utf-8')
        env = {'JARVIS_PORT': '8765'}
        app.load_local_env(f, env)
        self.assertEqual(env, {'JARVIS_PORT': '8765', 'JARVIS_LLM_MODEL': 'claude-sonnet-5-5'})
    def test_default_model_is_loopback(self):
        self.assertTrue(app.HOST == '127.0.0.1')
    def test_explicit_memory_and_delete(self):
        response = app.chat('Zapamiętaj: wolę krótkie wyjaśnienia')
        self.assertIn('Zapisałem', response)
        saved = app.rows('SELECT * FROM memories')
        self.assertEqual(len(saved), 1)
        self.assertIn('wolę krótkie', saved[0]['content'])
        self.assertTrue(app.delete_memory(saved[0]['id']))
        self.assertEqual(app.rows('SELECT * FROM memories'), [])
    def test_context_includes_approved_skills_only(self):
        with app.connection() as db:
            db.execute('INSERT INTO proposals(kind,title,description,instruction,status,created_at) VALUES (?,?,?,?,?,?)',
                       ('skill','Metoda sokratejska','Opis','Zadaj jedno pytanie po wyjaśnieniu.','pending',app.utcnow()))
            proposal_id = db.execute('SELECT id FROM proposals').fetchone()[0]
        self.assertNotIn('Metoda sokratejska', app.build_messages('test')[0]['content'])
        self.assertEqual(app.review_proposal(proposal_id,True),'active')
        self.assertIn('Metoda sokratejska', app.build_messages('test')[0]['content'])
        with self.assertRaises(ValueError):
            app.review_proposal(proposal_id,True)
    def test_code_approval_never_executes_code(self):
        with app.connection() as db:
            db.execute('INSERT INTO proposals(kind,title,description,instruction,status,created_at) VALUES (?,?,?,?,?,?)',
                       ('code','Wprowadź narzędzie','Plan','rm -rf /','pending',app.utcnow()))
            proposal_id = db.execute('SELECT id FROM proposals').fetchone()[0]
        self.assertEqual(app.review_proposal(proposal_id,True),'approved_for_manual_work')
        self.assertEqual(app.rows('SELECT * FROM skills'), [])
    def test_search_related_memory(self):
        app.remember('Projekt gry w Unity i programowaniu C#')
        app.remember('Lubię herbatę z cytryną')
        found = app.relevant_memories('Jak rozwijać programowanie Unity?',1)
        self.assertIn('Unity',found[0]['content'])
    def test_connection_is_closed(self):
        # 0.1.1: połączenie zamknięte po wyjściu z bloku (na Windows otwarte blokowało plik bazy)
        with app.connection() as db:
            db.execute('SELECT 1')
        import sqlite3
        with self.assertRaises(sqlite3.ProgrammingError):
            db.execute('SELECT 1')
    def test_invalid_inputs(self):
        with self.assertRaises(ValueError): app.remember('')
        with self.assertRaises(ValueError): app.chat('')
        with self.assertRaises(ValueError): app.propose('', 'execute_shell')

if __name__ == '__main__': unittest.main()
