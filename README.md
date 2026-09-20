# Azim & Nida — Wedding Invitation

Final corrected version.


## Music autoplay
Music playback is triggered directly by the **Open Invitation** tap. This is intentional: iPhone/Safari requires audio playback to be initiated by a user gesture. The top-right music button remains available for pause/resume.


### Venue image
The venue section uses `images/London-Palace.png`. Keep this filename/path unchanged when deploying.


### Mobile music playback
The invitation starts `music/jashn-e-bahaara.mp3` from the user's **Open Invitation** touch gesture using `pointerdown`, which is more reliable on iPhone/iPad Safari than starting audio on page load. Keep the MP3 at exactly `music/jashn-e-bahaara.mp3`.

Dress code update:
- Haldi: yellow outfit inspiration image
- Wedding: traditional outfit inspiration image
- Reception: western outfit inspiration image
The three illustration assets are in images/dress-haldi.png, images/dress-wedding.png, and images/dress-reception.png.
