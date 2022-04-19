const functions = require("firebase-functions");
const admin = require("firebase-admin");
// ユーザー権限（管理者）付与
exports.addAdminClaim = functions.firestore.document("admin_users/{docID}")
    .onCreate((snap) => {
      const newAdminUser = snap.data();
      if (newAdminUser === undefined) {
        return;
      }
      modifyAdmin(newAdminUser.uid, true);
      // true: 管理者
    });

// ユーザー権限（管理者）消去
exports.removeAdminClaim = functions.firestore.document("admin_users/{docID}")
    .onDelete((snap) => {
      const deletedAdminUser = snap.data();
      if (deletedAdminUser === undefined) {
        return;
      }
      modifyAdmin(deletedAdminUser.uid, false);
      // false: 管理者ではないユーザー
    });

const modifyAdmin = (uid, isAdmin) => {
  admin.auth().setCustomUserClaims(uid, {admin: isAdmin}).then();
};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
