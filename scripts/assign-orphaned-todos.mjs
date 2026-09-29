import mongoose from 'mongoose';

const ownerIdValue = process.argv[2];
const shouldApply = process.argv.includes('--apply');

if (!ownerIdValue || !mongoose.Types.ObjectId.isValid(ownerIdValue)) {
  console.error('Usage: pnpm migrate:todo-owner <ownerId> [--apply]');
  process.exitCode = 1;
} else if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not configured');
  process.exitCode = 1;
} else {
  const ownerId = new mongoose.Types.ObjectId(ownerIdValue);

  try {
    await mongoose.connect(process.env.MONGO_URI);

    const users = mongoose.connection.collection('users');
    const todos = mongoose.connection.collection('todos');
    const owner = await users.findOne({ _id: ownerId });

    if (!owner) {
      throw new Error(`User not found: ${ownerIdValue}`);
    }

    const filter = {
      $or: [{ ownerId: { $exists: false } }, { ownerId: null }],
    };
    const orphanedCount = await todos.countDocuments(filter);

    console.log(`Orphaned todos: ${orphanedCount}`);
    console.log(`Target owner: ${ownerIdValue}`);

    if (!shouldApply) {
      console.log('Dry run only. Add --apply to update these documents.');
    } else {
      const result = await todos.updateMany(filter, { $set: { ownerId } });
      console.log(`Updated todos: ${result.modifiedCount}`);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}
