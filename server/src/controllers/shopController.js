// controllers/shopController.js
import ShopRequest from '../models/ShopRequest.js';
import Shop from '../models/Shop.js';

// User submits a request to open a shop
export const requestShop = async (req, res) => {
  const { shopName, shopDescription } = req.body;
  const userId = req.user.id; // from JWT middleware

  try {
    // Check if already has a shop or pending request
    const existing = await ShopRequest.findOne({ userId, status: 'pending' });
    if (existing) {
      return res.status(400).json({ message: "You already have a pending request" });
    }

    const shop = await Shop.findOne({ userId });
    if (shop) {
      return res.status(400).json({ message: "You already have an approved shop" });
    }

    const request = new ShopRequest({ userId, shopName, shopDescription });
    await request.save();

    res.json({ message: "Shop request submitted. Awaiting admin approval." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin views all pending requests
export const getPendingRequests = async (req, res) => {
  try {
    const requests = await ShopRequest.find({ status: 'pending' })
      .populate('userId', 'name email'); // get user details
    res.json({ requests });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin approves a request
export const approveShopRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const request = await ShopRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Create the shop
    const shop = new Shop({
      userId: request.userId,
      shopName: request.shopName,
      shopDescription: request.shopDescription,
    });
    await shop.save();

    // Update request status
    request.status = 'approved';
    request.respondedAt = new Date();
    await request.save();

    res.json({ message: "Shop request approved!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin rejects a request
export const rejectShopRequest = async (req, res) => {
  const { requestId, adminNotes } = req.body;

  try {
    const request = await ShopRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = 'rejected';
    request.respondedAt = new Date();
    request.adminNotes = adminNotes;
    await request.save();

    res.json({ message: "Shop request rejected." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};