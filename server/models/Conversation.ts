import mongoose, { Document, Model, Schema } from "mongoose";

export interface IConversation extends Document {
    participants: string[];
    lastMessage?: mongoose.Types.ObjectId;
    updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>({
    participants: [{type: String, ref: "User", required: true}],
    lastMessage: {type: Schema.Types.ObjectId, ref: "Message"},
}, {timestamps: true});

// ensure uniqueness for a pair of participants
conversationSchema.index({participants: 1});

const Conversation: Model<IConversation> = mongoose.models.Conversation || mongoose.model<IConversation>("Conversation", conversationSchema);

export default Conversation;