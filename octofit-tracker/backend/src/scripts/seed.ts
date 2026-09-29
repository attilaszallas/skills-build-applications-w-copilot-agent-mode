import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const users = await Promise.all(
      [
        { name: 'Avery Chen', username: 'averyc', email: 'avery.chen@example.com' },
        { name: 'Jordan Lee', username: 'jordanl', email: 'jordan.lee@example.com' },
        { name: 'Mina Patel', username: 'minap', email: 'mina.patel@example.com' },
      ].map((user) =>
        UserModel.findOneAndUpdate(
          { email: user.email },
          { $set: user },
          { upsert: true, returnDocument: 'after' },
        ),
      ),
    );

    const teams = await Promise.all([
      TeamModel.findOneAndUpdate(
        { name: 'Trailblazers' },
        {
          $set: {
            description: 'A steady crew for outdoor miles and weekend hikes.',
            memberIds: [users[0]._id, users[1]._id],
          },
        },
        { upsert: true, returnDocument: 'after' },
      ),
      TeamModel.findOneAndUpdate(
        { name: 'Pace Setters' },
        {
          $set: {
            description: 'Focused on consistent training and personal bests.',
            memberIds: [users[2]._id],
          },
        },
        { upsert: true, returnDocument: 'after' },
      ),
    ]);

    const activities = [
      { userId: users[0]._id, activityType: 'run', startedAt: new Date('2026-09-27T07:30:00Z'), durationMinutes: 38, distanceKm: 6.2, calories: 410 },
      { userId: users[1]._id, activityType: 'cycling', startedAt: new Date('2026-09-27T09:00:00Z'), durationMinutes: 52, distanceKm: 18.5, calories: 520 },
      { userId: users[2]._id, activityType: 'strength', startedAt: new Date('2026-09-28T16:15:00Z'), durationMinutes: 44, distanceKm: 0, calories: 295 },
      { userId: users[0]._id, activityType: 'walk', startedAt: new Date('2026-09-29T06:45:00Z'), durationMinutes: 30, distanceKm: 2.8, calories: 145 },
    ];

    await Promise.all(
      activities.map((activity) =>
        ActivityModel.findOneAndUpdate(
          { userId: activity.userId, activityType: activity.activityType, startedAt: activity.startedAt },
          { $set: activity },
          { upsert: true, returnDocument: 'after' },
        ),
      ),
    );

    const period = new Date().toISOString().slice(0, 7);
    await Promise.all(
      [
        { userId: users[0]._id, period, points: 1840 },
        { userId: users[1]._id, period, points: 1625 },
        { userId: users[2]._id, period, points: 1510 },
      ].map((entry) =>
        LeaderboardModel.findOneAndUpdate(
          { userId: entry.userId, period: entry.period },
          { $set: entry },
          { upsert: true, returnDocument: 'after' },
        ),
      ),
    );

    await Promise.all(
      [
        { title: 'Foundation Run', description: 'An easy-paced run with a gradual warm-up and cool-down.', difficulty: 'beginner' as const, durationMinutes: 30, focus: 'cardio' },
        { title: 'Full-Body Strength', description: 'A balanced circuit of bodyweight strength movements.', difficulty: 'intermediate' as const, durationMinutes: 40, focus: 'strength' },
        { title: 'Mobility Reset', description: 'A low-impact session for hips, shoulders, and back.', difficulty: 'beginner' as const, durationMinutes: 20, focus: 'mobility' },
      ].map((workout) =>
        WorkoutModel.findOneAndUpdate(
          { title: workout.title },
          { $set: workout },
          { upsert: true, returnDocument: 'after' },
        ),
      ),
    );

    console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, 3 leaderboard entries, and 3 workouts.`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
