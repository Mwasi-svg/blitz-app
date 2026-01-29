Frequently Asked Questions:
Security
What does all security level mean?

Every dialog has different security level and it depends on how your contact was initially established. The most secure way to make a contact and prevent any spoofing is personal contact, when one person scans QR-key from the screen of the other user.

When you send your QR-key to another user using e-mail or other messaging app there is a change that hackers may use your QR-key to add himself to your contact and give oneself away as one of your friends.

What encryption algorithms are used?

Message encryption is done using AES CBC method with 256 bit key length, with separate pair of keys for every message dialog — one key for each direction.

For initial contact negotiation an asymmetric ECDH 521 algorithm with public key is used. In every QR-key only public key is embedded, corresponding private key is securely stored on your device.

What’s embedded in QR-key?

In QR-key that you send out to your friends the following information is stored: your nickname, unique user number, new public encryption key, protocol version and some additional information to speed up negotiation process.

How authorization is made?

Your device will generate unique random string after you launch it for the first time. That string will be stored on your device and sent to the server each time you open the app. The server will give you a unique number in return and that number will be used as your public address for other users.

How secure are these random encryption keys?

Random number generator in our application not only uses default system entropy settings, but also uses all available sensors (accelerometer and gyroscope) to make encryption keys more random and unpredictable.

Why does application require permission to my camera?

Application uses built-in camera to scan QR-keys as a primary method to add other people to the contacts list.

Main functions
How to add a new contact?

To add new a contact tap (+) sign on the main screen and follow the instructions on the screen. Decide who will generate QR-key and who will scan it, the particular order is not very important and will not affect security level and encryption strength in any way.

After somebody scans a QR-key of another user, both application will start exchanging with encryption keys, avatars and names. You will see a detailed schematic description of every step of this process.

In case of remote negotiation (via e-mail or other apps) make sure that both apps are online and connected to the Internet. You will be able to send messages when key exchange process completes.

How to tell if my message was read/received?

Each message undergoes several states: is sending, sent to the server, read by recipient. Because message could not be delivered to the recipient until he or she launches the application, there is no distinct “delivered to device” status.

After each message is delivered and read, it will be deleted from server and will only be stored on the two devices — yours and recipient’s.

I’ve received an error “Message couldn’t be decrypted”. What does it mean?

It means that a recipient’s device could not find a proper decryption to decipher your message.

It may happen when the recipient’s database was wiped or application was re-installed.

How to wipe message history on another user’s device?

You may delete every message individually or wipe out all messages in one step. There is also an auto-deletion option in application settings that will automatically delete old messages after certain amount of time.

If message was deleted on one device it will also be simultaneously deleted on the other device, regardless of who deleted and sent it.

Settings
How auto-deletion works and how to use it?

You may set different intervals for message auto-deletion — from 24 hours to one month. Each time you launch the application it will automatically delete messages on both devices that exceed the set time interval.

Please note that if the other user has set shorter auto-deletion interval than yours, all messages in your application will be deleted according to his or hers interval, not yours.

What is the key expiration lifetime and what does it mean?

Key lifetime is an optional security setting, that will remind you to renew your encryption keys with those, who has highest security level in your contacts list. When expiration time will be reached, nothing will be changed or deleted, there will be just a small “faded lock” icon near user’s name that will remind you to renew encryption keys with that person.

Why Touch ID is considered less safe than regular pin-code?

While activating Touch ID option, the PIN-code is stored on the device, what makes the user’s database and message history more vulnerable in compare with every session PIN-code enter.