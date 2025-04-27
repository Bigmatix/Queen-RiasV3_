const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Big-matix",
    ownerNumber: process.env.OWNER_NUMBER || "2349013231043",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ095U2RkSU9sZjNkdDBNR1h4SDVVdEtrbWZwSTJ4ZWJkQ0lUMEtsSFltWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGhyYzZsZ3haU0VpSENJOWF2bWxhb20xdExvSXRqMUNxUkc4K1ZkdUF4Yz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0TTRFcFU3R3NZMjVPNmYyaTFDNkVLOHUwMXI3ckt1SzZIU3dUY2RSUTFZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjWkk2NnF1VGF1RndoNzNkYWFUblI4VmI4cHYzdVRRNEh5NVhwT3l5TURNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklPVkY3dHFIUXlIZGM3RStzT0d5dHVBaDFZVEgraVhPK0hUNmpDS2pyMG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFlM0VzbGhlMXRYSXNEbzU1MmZ5TTNyTEtSTjV6OVUvWjNGSk93Y3l1U1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUdBek1QUmRiRXpBelZldDhGSTdUZ09TK2lZT21sYmZNTDBMSFBkb1gxYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSTV3c09BSldRNGk5RXRoZWM5K2xKTHYvbzduc0o0S0ViRlVnWVVxQUhXcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBlRkxZWk1vYTViNVJXSFdPS1pFN0ZDR2xiQ3lrcXppMHVqZTU4NmlpZTl4QUNrOTlrcXdRdHF1SzhSZFg2em0zM2xRcGNhWTREUUNCWThqTldQT2hBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc5LCJhZHZTZWNyZXRLZXkiOiJudkNMMjQ2RTFGTnJDLzBzMlliYmdYUm4rd1dmUkVRQ2hpVEh3eDhTNXhrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI5U1BZWkpMUSIsIm1lIjp7ImlkIjoiMjM0OTAxMzIzMTA0MzoxM0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjIwNjU5MjgyNTkzNDA3MToxM0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09PZTcvMEhFSlR3dXNBR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImZyd2Q5eEcrazVwS0FRNjdlaHRUT2R1NVNHK1F1VjVkMzk2ajF2MFNoVjQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im1HNUNSYi9hVHoyd0cxZkxzMDhZL3FybHc3V3RBNDQ1TGJnMmNmckJnU3RsalZMWHBxWTVmY2hSdU5CaUlkSEVEU3NidTdSOEFpeG0zTXpRdlpKTUFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJDU1VtQXJxWEYzU0tDUjcvb01Qa2s4TWtQdHFNNzRTRndOM3ExZlp2UktqQlpBdG5oYWtlUlM3dGJ6NEg1UXB5TGp0T0I4MW56aSs5eXRwbFVDV3RpQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkwMTMyMzEwNDM6MTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWDY4SGZjUnZwT2FTZ0VPdTNvYlV6bmJ1VWh2a0xsZVhkL2VvOWI5RW9WZSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1Nzk1MTA1LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
