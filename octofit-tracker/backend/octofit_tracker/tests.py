from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Team, Activity, Leaderboard, Workout

User = get_user_model()

class ModelTests(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(str(team), 'Test Team')

    def test_activity_creation(self):
        activity = Activity.objects.create(user='testuser', type='run', duration=10, team='Test Team')
        self.assertEqual(str(activity), 'testuser - run')

    def test_leaderboard_creation(self):
        leaderboard = Leaderboard.objects.create(team='Test Team', points=50)
        self.assertEqual(str(leaderboard), 'Test Team: 50')

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Test Workout', description='Test Desc')
        self.assertEqual(str(workout), 'Test Workout')
