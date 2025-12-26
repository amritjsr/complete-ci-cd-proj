import time
from django.core.management.base import BaseCommand
from django.db import connections
from django.db.utils import OperationalError

class Command(BaseCommand):
    help = 'Wait for database to be available'

    def handle(self, *args, **options):
        self.stdout.write('Waiting for DB...')
        retries = 10
        while retries:
            try:
                connections['default'].ensure_connection()
                self.stdout.write(self.style.SUCCESS('Database available'))
                return
            except OperationalError:
                retries -= 1
                self.stdout.write('DB not available, sleeping 1s...')
                time.sleep(1)
        raise RuntimeError('Database not available after retries')