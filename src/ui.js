import { afficherAvatar,validatePseudo,afficherAllPlayers,afficherPlayerSelect,preventLaunch,confirmationPlayer } from "./players.js";
import { getChoosePlayer } from "./storage.js";

afficherAvatar()

validatePseudo()

afficherAllPlayers()

let player=getChoosePlayer()

afficherPlayerSelect(player)

preventLaunch()

confirmationPlayer()