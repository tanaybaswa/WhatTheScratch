import { Schema, model, models } from 'mongoose';

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
  }
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;