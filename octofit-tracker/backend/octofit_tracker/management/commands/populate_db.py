from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

# Define models for teams, activities, leaderboard, and workouts
class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        app_label = 'octofit_tracker'

class Activity(models.Model):
    user = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    duration = models.IntegerField()
    team = models.CharField(max_length=100)
    class Meta:
        app_label = 'octofit_tracker'

class Leaderboard(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    class Meta:
        app_label = 'octofit_tracker'

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Delete all data
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users (super heroes)
        users = [
            {'username': 'ironman', 'email': 'ironman@marvel.com', 'team': 'Marvel'},
            {'username': 'captainamerica', 'email': 'cap@marvel.com', 'team': 'Marvel'},
            {'username': 'batman', 'email': 'batman@dc.com', 'team': 'DC'},
            {'username': 'superman', 'email': 'superman@dc.com', 'team': 'DC'},
        ]
        for u in users:
            User.objects.create_user(username=u['username'], email=u['email'], password='password')

        # Create activities
        Activity.objects.create(user='ironman', type='run', duration=30, team='Marvel')
        Activity.objects.create(user='batman', type='cycle', duration=45, team='DC')

        # Create leaderboard
        Leaderboard.objects.create(team='Marvel', points=100)
        Leaderboard.objects.create(team='DC', points=80)

        # Create workouts
        Workout.objects.create(name='Pushups', description='Do 20 pushups')
        Workout.objects.create(name='Situps', description='Do 30 situps')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
