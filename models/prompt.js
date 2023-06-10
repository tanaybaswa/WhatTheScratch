import { Schema, model, models } from 'mongoose';
import Link from 'next/link';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: [String],
    required: [true, 'Tag is required.'],
  },
  diff: {
    type: String,
    required: [true, 'Difficulty is required.'],
    default: "Medium",
  },
  scratch_link: {
    type: String,
    required: [false],
    default: "https:\/\/scratch.mit.edu",
  },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;