# User Management API Documentation

This document describes the user management endpoints for updating user profile, changing email with verification, and deleting accounts.

## Base URL
All endpoints are prefixed with: `/api/users`

## Authentication
All endpoints require authentication. User must be logged in via Google OAuth.

---

## 1. Update User Photo

**Endpoint:** `PATCH /api/users/update-photo`

**Description:** Updates the user's profile photo URL.

**Request Body:**
```json
{
  "photo": "https://example.com/new-photo.jpg"
}
```

**Success Response (200):**
```json
{
  "message": "Photo updated successfully",
  "user": {
    "_id": "...",
    "googleId": "...",
    "displayName": "John Doe",
    "email": "john@example.com",
    "photo": "https://example.com/new-photo.jpg",
    "bio": null,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Error Responses:**
- `400` - Photo URL is required
- `401` - Not authenticated
- `500` - Internal server error

---

## 2. Update Display Name

**Endpoint:** `PATCH /api/users/update-display-name`

**Description:** Updates the user's display name.

**Request Body:**
```json
{
  "displayName": "John Smith"
}
```

**Success Response (200):**
```json
{
  "message": "Display name updated successfully",
  "user": {
    "_id": "...",
    "displayName": "John Smith",
    ...
  }
}
```

**Error Responses:**
- `400` - Display name is required
- `401` - Not authenticated
- `500` - Internal server error

---

## 3. Update Bio

**Endpoint:** `PATCH /api/users/update-bio`

**Description:** Updates or adds the user's bio. For new accounts, bio is `null` by default.

**Request Body:**
```json
{
  "bio": "Software developer passionate about coding"
}
```

**To clear bio:**
```json
{
  "bio": null
}
```

**Success Response (200):**
```json
{
  "message": "Bio updated successfully",
  "user": {
    "_id": "...",
    "bio": "Software developer passionate about coding",
    ...
  }
}
```

**Error Responses:**
- `401` - Not authenticated
- `500` - Internal server error

---

## 4. Request Email Change

**Endpoint:** `POST /api/users/request-email-change`

**Description:** Initiates email change process by sending a 6-digit verification code to the new email address. The code is valid for 10 minutes.

**Request Body:**
```json
{
  "newEmail": "newemail@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Verification code sent to new email",
  "email": "newemail@example.com"
}
```

**Note:** In development mode, the verification code is logged to the console. In production, it will be sent via email.

**Error Responses:**
- `400` - Valid email is required
- `400` - Email already in use
- `401` - Not authenticated
- `500` - Failed to send verification code

---

## 5. Verify Email Change

**Endpoint:** `POST /api/users/verify-email-change`

**Description:** Verifies the code sent to the new email and updates the user's email if correct.

**Request Body:**
```json
{
  "code": "123456"
}
```

**Success Response (200):**
```json
{
  "message": "Email updated successfully",
  "user": {
    "_id": "...",
    "email": "newemail@example.com",
    ...
  }
}
```

**Error Responses:**
- `400` - Verification code is required
- `400` - Verification code expired or not found
- `400` - Invalid verification code (with attempts remaining)
- `400` - Too many failed attempts
- `401` - Not authenticated
- `500` - Failed to verify email change

**Notes:**
- You have 5 attempts to enter the correct code
- Code expires after 10 minutes
- Must request a new code if it expires or after 5 failed attempts

---

## 6. Delete Account

**Endpoint:** `DELETE /api/users/delete-account`

**Description:** Permanently deletes the user account and logs the user out.

**Request Body:** None

**Success Response (200):**
```json
{
  "message": "Account deleted successfully"
}
```

**Error Responses:**
- `401` - Not authenticated
- `500` - Failed to delete account

**Warning:** This action is irreversible. All user data will be permanently deleted.

---

## User Model Schema

```javascript
{
  googleId: String (required, unique),
  displayName: String (required),
  email: String (required),
  photo: String,
  bio: String (default: null),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Testing with cURL

### Update Photo
```bash
curl -X PATCH http://localhost:5000/api/users/update-photo \
  -H "Content-Type: application/json" \
  -d '{"photo":"https://example.com/photo.jpg"}' \
  --cookie "connect.sid=YOUR_SESSION_ID"
```

### Update Display Name
```bash
curl -X PATCH http://localhost:5000/api/users/update-display-name \
  -H "Content-Type: application/json" \
  -d '{"displayName":"New Name"}' \
  --cookie "connect.sid=YOUR_SESSION_ID"
```

### Update Bio
```bash
curl -X PATCH http://localhost:5000/api/users/update-bio \
  -H "Content-Type: application/json" \
  -d '{"bio":"My new bio"}' \
  --cookie "connect.sid=YOUR_SESSION_ID"
```

### Request Email Change
```bash
curl -X POST http://localhost:5000/api/users/request-email-change \
  -H "Content-Type: application/json" \
  -d '{"newEmail":"newemail@example.com"}' \
  --cookie "connect.sid=YOUR_SESSION_ID"
```

### Verify Email Change
```bash
curl -X POST http://localhost:5000/api/users/verify-email-change \
  -H "Content-Type: application/json" \
  -d '{"code":"123456"}' \
  --cookie "connect.sid=YOUR_SESSION_ID"
```

### Delete Account
```bash
curl -X DELETE http://localhost:5000/api/users/delete-account \
  --cookie "connect.sid=YOUR_SESSION_ID"
```

---

## Email Configuration for Production

To enable actual email sending in production, install nodemailer:

```bash
npm install nodemailer
```

Then add these environment variables to your `.env` file:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

The email sending code is already prepared in `userController.js` - just uncomment the nodemailer section.

---

## Implementation Complete ✓

All 5 features have been implemented:
1. ✓ Update photo
2. ✓ Update display name  
3. ✓ Update email with verification code
4. ✓ Add bio field (defaults to null for new accounts)
5. ✓ Delete account

Next step: Implement the UI components for these features.
