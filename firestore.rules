rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ── usernames/{username} ─────────────────────────────────────────────────
    // Stores username → uid mapping for uniqueness enforcement.
    match /usernames/{username} {
      // Anyone can read — required for live availability check on signup form.
      allow read: if true;

      // Only the authenticated user whose uid matches can claim a username.
      allow create: if request.auth != null
                    && request.resource.data.uid == request.auth.uid;

      // Usernames cannot be transferred or deleted from the client.
      allow update, delete: if false;
    }

    // ── profiles/{username} ──────────────────────────────────────────────────
    // Public profile documents — readable by everyone, writable only by owner.
    match /profiles/{username} {
      // Public read — anyone can view a profile page.
      allow read: if true;

      // Owner can create their profile on signup.
      allow create: if request.auth != null
                    && request.resource.data.uid == request.auth.uid
                    && validProfile(request.resource.data);

      // Owner can update their own profile; uid field is immutable.
      allow update: if request.auth != null
                    && resource.data.uid == request.auth.uid
                    && request.resource.data.uid == resource.data.uid
                    && validProfile(request.resource.data);

      // Profiles cannot be deleted from the client.
      allow delete: if false;
    }
  }

  // ── Profile field validation ─────────────────────────────────────────────
  function validProfile(data) {
    return data.keys().hasAll(['uid', 'username', 'displayName'])
        && data.uid is string
        && data.username is string
        && data.displayName is string
        && data.displayName.size() <= 40
        && (!('bio' in data)         || (data.bio is string && data.bio.size() <= 160))
        && (!('avatar' in data)      || data.avatar is string)
        && (!('accentColor' in data) || data.accentColor is string)
        && (!('links' in data)       || (data.links is list && data.links.size() <= 20));
  }
}
