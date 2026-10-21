import contactModel from "../models/contactModel.js";

// Add new contact message
const addContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newMessage = new contactModel({
            name,
            email,
            subject,
            message
        });
        await newMessage.save();
        res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error sending message" });
    }
}

// Get all contact messages for Admin
const listContactMessages = async (req, res) => {
    try {
        const messages = await contactModel.find({}).sort({ date: -1 });
        res.json({ success: true, data: messages });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching messages" });
    }
}

// Delete a message (Optional but useful for Admin)
const deleteContactMessage = async (req, res) => {
    try {
        await contactModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Message deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error deleting message" });
    }
}

export { addContactMessage, listContactMessages, deleteContactMessage };
