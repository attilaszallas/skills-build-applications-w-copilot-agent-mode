import { model, Schema, Types } from 'mongoose';

interface User {
  name: string;
  username: string;
  email: string;
}

interface Team {
  name: string;
  description: string;
  memberIds: Types.ObjectId[];
}

interface Activity {
  userId: Types.ObjectId;
  activityType: string;
  startedAt: Date;
  durationMinutes: number;
  distanceKm: number;
  calories: number;
}

interface LeaderboardEntry {
  userId: Types.ObjectId;
  period: string;
  points: number;
}

interface Workout {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  focus: string;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema<Activity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true },
    startedAt: { type: Date, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, required: true, min: 0 },
    calories: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);
activitySchema.index({ userId: 1, activityType: 1, startedAt: 1 }, { unique: true });

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    period: { type: String, required: true },
    points: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);
leaderboardSchema.index({ userId: 1, period: 1 }, { unique: true });

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    focus: { type: String, required: true },
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema);
export const TeamModel = model<Team>('Team', teamSchema);
export const ActivityModel = model<Activity>('Activity', activitySchema);
export const LeaderboardModel = model<LeaderboardEntry>('Leaderboard', leaderboardSchema);
export const WorkoutModel = model<Workout>('Workout', workoutSchema);