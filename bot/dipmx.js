module.exports = dipmx = async (p41, p42, p43, p44) => {
  try {
    const v85 = p42.key.remoteJid;
    const v86 = p42.text || "";
    const vLS5 = ".";
    const v87 = v86.startsWith(vLS5) ? v86.slice(vLS5.length).trim().split(" ").shift().toLowerCase() : "";
    const v88 = v86.trim().split(/ +/).slice(1);
    const v89 = v85.endsWith("@g.us");
    const isOwner = p42.key.fromMe;
    const fs3 = require("fs");
    const vLSsettingsjson2 = "./settings.json";
    if (!fs3.existsSync(vLSsettingsjson2)) {
      fs3.writeFileSync(vLSsettingsjson2, JSON.stringify({
        isPublic: true
      }));
    }
    global.isPublic = JSON.parse(fs3.readFileSync(vLSsettingsjson2)).isPublic;
    const vO10 = {
      isPublic: global.isPublic
    };
    const vF7 = () => fs3.writeFileSync(vLSsettingsjson2, JSON.stringify(vO10));
    let v91 = v88.join(" ").trim();
    const moment2 = require("moment");
    global.premium = JSON.parse(fs3.readFileSync("./all/database/premium.json"));
    function f3() {
      fs3.writeFileSync("./all/database/premium.json", JSON.stringify(global.premium, null, 2));
    }
    function f4(p45) {
      if (!global.premium[p45]) {
        return false;
      }
      if (Date.now() >= global.premium[p45]) {
        delete global.premium[p45];
        f3();
        return false;
      }
      return true;
    }
    setInterval(() => {
      const v92 = Date.now();
      for (let v93 in global.premium) {
        const v94 = global.premium[v93] - v92;
        if (v94 > 0 && v94 < 86400000 && !global.notifPrem) {
          p41.sendMessage(v93, {
            text: "⏰ *Premium kamu akan habis dalam 24 jam!*\nSegera perpanjang sebelum kadaluarsa."
          });
        }
      }
      global.notifPrem = true;
    }, 60000);
    const antilinkFile = "./all/database/antilinkmode.json";
    let antilinkDB = {};
    try {
      if (fs3.existsSync(antilinkFile)) {
        antilinkDB = JSON.parse(fs3.readFileSync(antilinkFile));
      }
    } catch (e) {
      antilinkDB = {};
    }

    const antilinkMode = antilinkDB[v85]; // v85 = chat id (group)
    const v95 = JSON.parse(fs3.readFileSync("./all/database/owner.json"));
    const v90 = v95.includes(p42.sender) || isOwner;
    const v96 = p42.isGroup ? await p41.groupMetadata(p42.chat) : {};
    const v97 = p41.user.id.split(":")[0] + "@s.whatsapp.net";
    const v98 = p42.isGroup ? v96.participants.find(p => p.jid === p42.sender)?.admin?.endsWith('admin') || false : false;
    const v99 = p42.isGroup ? v96.participants.find(p47 => p47.jid === v97 && (p47.admin === "admin" || p47.admin === "superadmin")) : false;
    const vO11 = {
      quoted: p42
    };
    const vF8 = p48 => p41.sendMessage(v85, {
      text: p48
    }, vO11);
    if (p42.isGroup && antilinkMode && p42.body?.includes("chat.whatsapp.com")) {
      const groupMetadata = await p41.groupMetadata(v85);
      const groupAdmins = groupMetadata.participants
        .filter(p => p.admin !== null)
        .map(p => p.jid);

      const botNumber = p41.user.id.split(":")[0] + "@s.whatsapp.net";
      const botIsAdmin = groupAdmins.includes(botNumber);
      const senderIsAdmin = groupAdmins.includes(p42.sender);

      const hapus =
        antilinkMode === "antilink2" ||
        (antilinkMode === "antilink1" && !senderIsAdmin);

      if (botIsAdmin && hapus) {
        await p41.sendMessage(v85, {
          delete: {
            remoteJid: v85,
            fromMe: false,
            id: p42.key.id,
            participant: p42.sender,
          },
        });
      }
    }
    if (!global.isPublic && !v90) {
      return;
    }
    switch (v87) {
      case "menu":
        {
          const v101 = `
┏━━ ⭑ *MAIN MENU* ⭑ ━━┓ 
┃ • 〽️NAMA : 𝗜𝗤𝗕𝗔𝗔𝗟𝗟🥶
┃ • 🎀STATUS BOT : 𝗧𝗲𝗿𝗵𝘂𝗯𝘂𝗻𝗴 
┃ • 💸VERSION : 𝟮.𝟱
┗━━━━━━━━━━━━━━┛                     

┏━━ ⭑ *OWN + USER MENU* ⭑ ━━┓ 
┃ • .𝐨𝐰𝐧𝐞𝐫 : 𝐢𝐧𝐟𝐨 𝐧𝐨𝐦𝐨𝐫 𝐩𝐞𝐦𝐢𝐥𝐢𝐤 𝐛𝐨𝐭
┃ • .𝐬𝐜𝐫𝐢𝐩𝐭 : 𝐡𝐚𝐫𝐠𝐚 𝐬𝐜𝐫𝐢𝐩𝐭 𝐛𝐨𝐭 𝐫𝐞𝐤𝐚𝐩
┃ • .𝐡𝐚𝐫𝐠𝐚 : 𝐡𝐚𝐫𝐠𝐚 𝐬𝐞𝐰𝐚 𝐛𝐨𝐭 𝐫𝐞𝐤𝐚𝐩
┃ • .𝐜𝐡𝐞𝐜𝐤 : 𝐜𝐞𝐤 𝐥𝐮 𝐩𝐫𝐞𝐦 𝐚𝐭𝐚𝐮 𝐤𝐠𝐤
┃ • .𝐦𝐨𝐝𝐞 : 𝐌𝐨𝐝𝐞 𝐁𝐨𝐭 (𝐒𝐞𝐥𝐟/𝐏𝐮𝐛𝐥𝐢𝐜)
┃ • .𝐩𝐢𝐧𝐠 : 𝐂𝐞𝐤 𝐒𝐭𝐚𝐭𝐮𝐬 𝐁𝐨𝐭
┗━━━━━━━━━━━━━━━━━┛

┏━━ ⭑ 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐅𝐈𝐓𝐔𝐑 ⭑ ━━┓    
┃ • .𝐡 / .𝐭 : 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐇𝐢𝐝𝐞𝐭𝐚𝐠   
┃ • .𝐛𝐚𝐥 : 𝐑𝐞𝐤𝐚𝐩 𝐥𝐢𝐬𝐭 𝐩𝐫𝐢𝐛𝐚𝐝𝐢  
┃ • .𝐛𝐚𝐥𝐯 : 𝐬𝐮𝐩𝐨𝐫𝐭 𝐚𝐥𝐥 𝐥𝐢𝐬𝐭
┃ • .𝐫𝐞𝐤𝐚𝐩 : 𝐑𝐞𝐤𝐚𝐩 𝐚𝐥𝐥 𝐊𝐁/𝐋𝐀𝐆𝐀
┃•  .𝐫𝐞𝐤𝐚𝐩𝐤 : 𝐑𝐞𝐤𝐚𝐩 𝐊𝐞𝐜𝐢𝐥
┃ • .𝐫𝐞𝐤𝐚𝐩𝐛 : 𝐑𝐞𝐤𝐚𝐩 𝐁𝐞𝐬𝐚𝐫
┗━━━━━━━━━━━━━━━━━┛

┏━━  ⭑𝐕𝐈𝐏 𝐅𝐈𝐓𝐔𝐑⭑ ━━┓
┃ • .𝐰𝐢𝐧𝐤 𝐬𝐤𝐨𝐫 : 𝐂𝐚𝐭𝐚𝐭 𝐰𝐢𝐧 𝐤𝐞𝐜𝐢𝐥
┃ • .𝐰𝐢𝐧𝐛 𝐬𝐤𝐨𝐫 : 𝐂𝐚𝐭𝐚𝐭 𝐰𝐢𝐧 𝐛𝐞𝐬𝐚𝐫
┃ • .𝐝𝐞𝐩𝐨 [𝐧𝐚𝐦𝐚 𝐣𝐮𝐦𝐥𝐚𝐡] : 𝐃𝐞𝐩𝐨𝐬𝐢𝐭 𝐬𝐚𝐥𝐝𝐨
┃ • .𝐤𝐮𝐫𝐚𝐧𝐠 [𝐧𝐚𝐦𝐚 𝐣𝐮𝐦𝐥𝐚𝐡] : 𝐌𝐞𝐦𝐛𝐮𝐚𝐭 𝐬𝐚𝐥𝐝𝐨 𝐥𝐟
┃ • .𝐠𝐞𝐬𝐞𝐫 [𝐧𝐚𝐦𝐚 𝐣𝐮𝐦𝐥𝐚𝐡 𝐩𝐞𝐧𝐞𝐫𝐢𝐦𝐚] : 𝐓𝐫𝐚𝐧𝐬𝐟𝐞𝐫 𝐬𝐚𝐥𝐝𝐨
┃ • .𝐞𝐝𝐢𝐭 : 𝐞𝐝𝐢𝐭 𝐬𝐚𝐥𝐝𝐨
┃ • .𝐫𝐞𝐬𝐞𝐭 : 𝐑𝐞𝐬𝐞𝐭 𝐝𝐚𝐭𝐚 𝐥𝐰 & 𝐒𝐚𝐥𝐝𝐨
┃ • .𝐛𝐚𝐜𝐤 : 𝐁𝐚𝐭𝐚𝐥𝐤𝐚𝐧 𝐠𝐚𝐦𝐞 𝐬𝐞𝐛𝐞𝐥𝐮𝐦𝐧𝐲𝐚
┃ • .𝐬𝐞𝐭𝐥𝐰 : 𝐄𝐝𝐢𝐭 𝐋𝐰 𝐒𝐞𝐬𝐮𝐤𝐚 𝐋𝐮
┃ • .𝐫𝐞𝐦𝐨𝐯𝐞+ : 𝐡𝐚𝐩𝐮𝐬 𝐬𝐚𝐥𝐝𝐨 𝐥𝐰
┃ • .𝐫𝐞𝐦𝐨𝐯𝐞- : 𝐡𝐚𝐩𝐮𝐬 𝐬𝐚𝐥𝐝𝐨 𝐥𝐟/𝐮𝐭𝐚𝐧𝐠
┃ • .𝐬𝐚𝐥𝐝𝐨 : 𝐭𝐨𝐭𝐚𝐥 𝐟𝐞𝐞 𝐬𝐚𝐚𝐭 𝐥𝐮 𝐨𝐩𝐞𝐧
┗━━━━━━━━━━━━━━━━━┛

┏━━ ⭑ 𝐆𝐑𝐔𝐏 𝐅𝐈𝐓𝐔𝐑 ⭑ ━━┓ 
┃ • .𝐨𝐩𝐞𝐧𝐠𝐜 / .𝐜𝐥𝐨𝐬𝐞𝐠𝐜 : 𝐁𝐮𝐤𝐚/𝐭𝐮𝐭𝐮𝐩 𝐠𝐫𝐮𝐩 
┃ • .𝐤𝐢𝐜𝐤 : 𝐊𝐞𝐥𝐮𝐚𝐫𝐤𝐚𝐧 𝐚𝐧𝐠𝐠𝐨𝐭𝐚 
┃ • .𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤𝟏 : 𝐋𝐢𝐧𝐤 𝐚𝐝𝐦𝐢𝐧 𝐭𝐞𝐭𝐚𝐩 𝐚𝐦𝐚𝐧 
┃ • .𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤𝟐 : 𝐇𝐚𝐩𝐮𝐬 𝐬𝐞𝐦𝐮𝐚 𝐣𝐞𝐧𝐢𝐬 𝐥𝐢𝐧𝐤 
┃ • .𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤𝐨𝐟𝐟 : 𝐦𝐚𝐭𝐢𝐤𝐚𝐧 𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤
┃ • .𝐝𝐞𝐥 : 𝐇𝐚𝐩𝐮𝐬 𝐩𝐞𝐬𝐚𝐧 𝐭𝐞𝐫𝐭𝐞𝐧𝐭𝐮 
┃ • .𝐣𝐨𝐢𝐧 : 𝐦𝐚𝐬𝐮𝐤𝐚𝐧 𝐛𝐨𝐭 𝐤𝐞 𝐠𝐫𝐮𝐩
┃ • .𝐥𝐞𝐚𝐯𝐞 : 𝐤𝐞𝐥𝐮𝐚𝐫𝐤𝐚𝐧 𝐛𝐨𝐭 𝐝𝐫𝐢 𝐠𝐫𝐮𝐩
┗━━━━━━━━━━━━━━━━━━━┛
`;
          vF8(v101);
          p41.sendMessage(
              v85,
              {
                audio: { url: "https://ndikz-nime.my.id/uploads/pL6J8iGIanbmZTRJ.mpeg" },
                mimetype: "audio/mpeg",
                ptt: true,
              },
              { quoted: p42 }
            );
        }
        break;
        case "pp": {
  // Jika chat bukan grup, langsung keluar case tanpa reply
  if (!p42.isGroup) break;

  if (!f4(p42.sender) && !(v90 && isAdmin)) {
    return vF8("❌ Hanya *Owner* atau *Premium yang admin grup* yang bisa pakai perintah ini!");
  }

  try {
    let ppUrl = await p41.profilePictureUrl(v85, "image");

    const teks = `
*NIH*
    `.trim();

    await p41.sendMessage(
      v85,
      {
        image: { url: ppUrl },
        caption: teks
      },
      { quoted: p42 }
    );
  } catch (err) {
    await p41.sendMessage(
      v85,
      { text: "❌ Grup ini tidak memiliki foto profil." },
      { quoted: p42 }
    );
  }
}
break;
      case "rekap":
        {
          if (!f4(p42.sender)) {
            return;
          }
          if (!p42.quoted || !p42.quoted.text) {
            return vF8("*OPEN LE TENANAN SU!!😡😡 BAJINGAN*");
          }
          const vA13 = [{
            min: 1,
            max: 9,
            biaya: 1
          }, {
            min: 10,
            max: 19,
            biaya: 2
          }, {
            min: 20,
            max: 29,
            biaya: 3
          }, {
            min: 30,
            max: 39,
            biaya: 4
          }, {
            min: 40,
            max: 49,
            biaya: 5
          }, {
            min: 50,
            max: 59,
            biaya: 6
          }, {
            min: 60,
            max: 69,
            biaya: 7
          }, {
            min: 70,
            max: 79,
            biaya: 8
          }, {
            min: 80,
            max: 89,
            biaya: 9
          }, {
            min: 90,
            max: 99,
            biaya: 10
          }, {
            min: 100,
            max: 109,
            biaya: 11
          }, {
            min: 110,
            max: 119,
            biaya: 12
          }, {
            min: 120,
            max: 129,
            biaya: 13
          }, {
            min: 130,
            max: 139,
            biaya: 14
          }, {
            min: 140,
            max: 149,
            biaya: 15
          }, {
            min: 150,
            max: 159,
            biaya: 16
          }, {
            min: 160,
            max: 169,
            biaya: 17
          }, {
            min: 170,
            max: 179,
            biaya: 18
          }, {
            min: 180,
            max: 189,
            biaya: 19
          }, {
            min: 190,
            max: 199,
            biaya: 20
          }, {
            min: 200,
            max: 209,
            biaya: 21
          }, {
            min: 210,
            max: 219,
            biaya: 22
          }, {
            min: 220,
            max: 229,
            biaya: 23
          }, {
            min: 230,
            max: 239,
            biaya: 24
          }, {
            min: 240,
            max: 249,
            biaya: 25
          }, {
            min: 250,
            max: 259,
            biaya: 26
          }, {
            min: 260,
            max: 269,
            biaya: 27
          }, {
            min: 270,
            max: 279,
            biaya: 30
          }, {
            min: 280,
            max: 289,
            biaya: 31
          }, {
            min: 290,
            max: 299,
            biaya: 32
          }, {
            min: 300,
            max: 309,
            biaya: 33
          }, {
            min: 310,
            max: 319,
            biaya: 34
          }, {
            min: 320,
            max: 329,
            biaya: 35
          }, {
            min: 330,
            max: 339,
            biaya: 36
          }, {
            min: 340,
            max: 349,
            biaya: 37
          }, {
            min: 350,
            max: 359,
            biaya: 38
          }, {
            min: 360,
            max: 369,
            biaya: 39
          }, {
            min: 370,
            max: 379,
            biaya: 40
          }, {
            min: 380,
            max: 389,
            biaya: 41
          }, {
            min: 390,
            max: 399,
            biaya: 42
          }, {
            min: 400,
            max: 409,
            biaya: 43
          }, {
            min: 410,
            max: 419,
            biaya: 44
          }, {
            min: 420,
            max: 429,
            biaya: 45
          }, {
            min: 430,
            max: 439,
            biaya: 46
          }, {
            min: 440,
            max: 449,
            biaya: 47
          }, {
            min: 450,
            max: 459,
            biaya: 48
          }, {
            min: 460,
            max: 469,
            biaya: 49
          }, {
            min: 470,
            max: 479,
            biaya: 50
          }, {
            min: 480,
            max: 489,
            biaya: 51
          }, {
            min: 490,
            max: 499,
            biaya: 52
          }, {
            min: 500,
            max: 509,
            biaya: 53
          }, {
            min: 510,
            max: 519,
            biaya: 54
          }, {
            min: 520,
            max: 529,
            biaya: 55
          }, {
            min: 530,
            max: 539,
            biaya: 56
          }, {
            min: 540,
            max: 549,
            biaya: 57
          }, {
            min: 550,
            max: 559,
            biaya: 58
          }, {
            min: 560,
            max: 569,
            biaya: 59
          }, {
            min: 570,
            max: 579,
            biaya: 60
          }, {
            min: 580,
            max: 589,
            biaya: 61
          }, {
            min: 590,
            max: 599,
            biaya: 62
          }, {
            min: 600,
            max: 609,
            biaya: 63
          }, {
            min: 610,
            max: 619,
            biaya: 64
          }, {
            min: 620,
            max: 629,
            biaya: 65
          }, {
            min: 630,
            max: 639,
            biaya: 66
          }, {
            min: 640,
            max: 649,
            biaya: 67
          }, {
            min: 650,
            max: 659,
            biaya: 68
          }, {
            min: 660,
            max: 669,
            biaya: 69
          }, {
            min: 670,
            max: 679,
            biaya: 70
          }, {
            min: 680,
            max: 689,
            biaya: 71
          }, {
            min: 690,
            max: 699,
            biaya: 72
          }, {
            min: 700,
            max: 709,
            biaya: 73
          }, {
            min: 710,
            max: 719,
            biaya: 74
          }, {
            min: 720,
            max: 729,
            biaya: 75
          }, {
            min: 730,
            max: 739,
            biaya: 76
          }, {
            min: 740,
            max: 749,
            biaya: 77
          }, {
            min: 750,
            max: 759,
            biaya: 78
          }, {
            min: 760,
            max: 769,
            biaya: 79
          }, {
            min: 770,
            max: 779,
            biaya: 80
          }, {
            min: 780,
            max: 789,
            biaya: 81
          }, {
            min: 790,
            max: 799,
            biaya: 82
          }, {
            min: 800,
            max: 809,
            biaya: 83
          }, {
            min: 810,
            max: 819,
            biaya: 84
          }, {
            min: 820,
            max: 829,
            biaya: 85
          }, {
            min: 830,
            max: 839,
            biaya: 86
          }, {
            min: 840,
            max: 849,
            biaya: 87
          }, {
            min: 850,
            max: 859,
            biaya: 88
          }, {
            min: 860,
            max: 869,
            biaya: 89
          }, {
            min: 870,
            max: 879,
            biaya: 90
          }, {
            min: 880,
            max: 889,
            biaya: 91
          }, {
            min: 890,
            max: 899,
            biaya: 92
          }, {
            min: 900,
            max: 909,
            biaya: 93
          }, {
            min: 910,
            max: 919,
            biaya: 94
          }, {
            min: 920,
            max: 929,
            biaya: 95
          }, {
            min: 930,
            max: 939,
            biaya: 96
          }, {
            min: 940,
            max: 949,
            biaya: 97
          }, {
            min: 950,
            max: 959,
            biaya: 98
          }, {
            min: 960,
            max: 969,
            biaya: 99
          }, {
            min: 970,
            max: 979,
            biaya: 100
          }, {
            min: 980,
            max: 989,
            biaya: 101
          }, {
            min: 990,
            max: 999,
            biaya: 102
          }, {
            min: 1000,
            max: 1009,
            biaya: 103
          }, {
            min: 1010,
            max: 1019,
            biaya: 104
          }, {
            min: 1020,
            max: 1029,
            biaya: 105
          }, {
            min: 1030,
            max: 1039,
            biaya: 106
          }, {
            min: 1040,
            max: 1049,
            biaya: 107
          }, {
            min: 1050,
            max: 1059,
            biaya: 108
          }, {
            min: 1060,
            max: 1069,
            biaya: 109
          }, {
            min: 1080,
            max: 1089,
            biaya: 110
          }, {
            min: 1090,
            max: 1099,
            biaya: 111
          }, {
            min: 1100,
            max: 1109,
            biaya: 112
          }, {
            min: 1110,
            max: 1119,
            biaya: 113
          }, {
            min: 1120,
            max: 1129,
            biaya: 114
          }, {
            min: 1130,
            max: 1139,
            biaya: 115
          }, {
            min: 1140,
            max: 1149,
            biaya: 116
          }, {
            min: 1150,
            max: 1159,
            biaya: 117
          }, {
            min: 1160,
            max: 1169,
            biaya: 118
          }, {
            min: 1170,
            max: 1179,
            biaya: 119
          }, {
            min: 1180,
            max: 1189,
            biaya: 120
          }, {
            min: 1190,
            max: 1199,
            biaya: 121
          }, {
            min: 1200,
            max: 1209,
            biaya: 122
          }, {
            min: 1210,
            max: 1219,
            biaya: 123
          }, {
            min: 1220,
            max: 1229,
            biaya: 124
          }, {
            min: 1230,
            max: 1239,
            biaya: 125
          }, {
            min: 1240,
            max: 1249,
            biaya: 126
          }, {
            min: 1250,
            max: 1259,
            biaya: 127
          }, {
            min: 1260,
            max: 1269,
            biaya: 128
          }, {
            min: 1270,
            max: 1279,
            biaya: 129
          }, {
            min: 1280,
            max: 1289,
            biaya: 130
          }, {
            min: 1290,
            max: 1299,
            biaya: 131
          }, {
            min: 1300,
            max: 1309,
            biaya: 132
          }, {
            min: 1310,
            max: 1319,
            biaya: 133
          }, {
            min: 1320,
            max: 1329,
            biaya: 134
          }, {
            min: 1330,
            max: 1339,
            biaya: 135
          }, {
            min: 1340,
            max: 1349,
            biaya: 136
          }, {
            min: 1350,
            max: 1359,
            biaya: 137
          }, {
            min: 1360,
            max: 1369,
            biaya: 138
          }, {
            min: 1370,
            max: 1379,
            biaya: 139
          }, {
            min: 1380,
            max: 1389,
            biaya: 140
          }, {
            min: 1390,
            max: 1399,
            biaya: 141
          }, {
            min: 1400,
            max: 1409,
            biaya: 142
          }, {
            min: 1410,
            max: 1419,
            biaya: 143
          }, {
            min: 1420,
            max: 1429,
            biaya: 144
          }, {
            min: 1430,
            max: 1439,
            biaya: 145
          }, {
            min: 1440,
            max: 1449,
            biaya: 146
          }, {
            min: 1450,
            max: 1459,
            biaya: 147
          }, {
            min: 1460,
            max: 1469,
            biaya: 148
          }, {
            min: 1470,
            max: 1479,
            biaya: 149
          }, {
            min: 1480,
            max: 1489,
            biaya: 150
          }, {
            min: 1490,
            max: 1499,
            biaya: 151
          }, {
            min: 1500,
            max: 1509,
            biaya: 152
          }];
          const vF9 = p49 => {
            const v102 = vA13.find(p50 => p49 >= p50.min && p49 <= p50.max);
            if (v102) {
              return v102.biaya;
            } else {
              return 0;
            }
          };
          const v103 = p42.quoted.text.split("\n").filter(p51 => p51.trim() !== "");
          let vA14 = [];
          let vA15 = [];
          let v104 = null;
          let vLN07 = 0;
          v103.forEach(p52 => {
            if (/^k(?:ecil)?\s*:/i.test(p52)) {
              v104 = "kecil";
            } else if (/^b(?:esar)?\s*:/i.test(p52)) {
              v104 = "besar";
            } else if (v104) {
              const v105 = p52.match(/(\d+)(.*)/);
              if (v105) {
                const vParseInt6 = parseInt(v105[1]);
                const v106 = v105[2]?.trim() || "";
                const v107 = /lf|LF|p|P|l|L|A/i.test(v106);
                const vVF9 = vF9(vParseInt6);
                const v108 = v107 ? vParseInt6 - vVF9 : vParseInt6 * 2 - vVF9;
                vLN07 += vVF9;
                const vO12 = {
                  nama: p52.replace(/\d+.*/, "").trim(),
                  angkaAwal: vParseInt6,
                  angkaAkhir: v108,
                  tambahanHuruf: v106
                };
                if (v104 === "kecil") {
                  vA14.push(vO12);
                } else {
                  vA15.push(vO12);
                }
              }
            }
          });
          const vF10 = p53 => {
            return p53.map(p54 => p54.nama + " " + p54.angkaAwal + " \\ " + p54.angkaAkhir + " " + (p54.tambahanHuruf ? p54.tambahanHuruf : "")).join("\n");
          };
          vF8("*📈 BESAR*:\n" + (vF10(vA15) || "Tidak ada") + "\n\n*📉 KECIL*:\n" + (vF10(vA14) || "Tidak ada") + "\n\n🎰 *Total Fee: " + vLN07 + "*\n\n© 𝗜𝗤𝗕𝗔𝗔𝗟𝗟🥶");
        }
        break;
      case "bal": {
  if (!f4(p42.sender)) {
    return;
  }
  if (!p42.quoted || !p42.quoted.text) {
    return vF8("*OPEN LE TENANAN SU!!😡😡 BAJINGAN*");
  }

  const v109 = p42.quoted.text.split("\n").filter(p55 => p55.trim() !== "");
  let vA16 = [];
  let vA17 = [];
  let vLN08 = 0;
  let vLN09 = 0;
  let v110 = null;

  v109.forEach(p56 => {
    if (/^k(?:ecil)?\s*:/i.test(p56)) {
      v110 = "kecil";
    } else if (/^b(?:esar)?\s*:/i.test(p56)) {
      v110 = "besar";
    } else if (v110) {
      const v111 = p56.match(/(\d+)\s*(A|P|LF)?/i);
      if (v111) {
        const vParseInt7 = parseInt(v111[1]);
        if (v110 === "kecil") {
          vA16.push(vParseInt7);
          vLN08 += vParseInt7;
        }
        if (v110 === "besar") {
          vA17.push(vParseInt7);
          vLN09 += vParseInt7;
        }
      }
    }
  });

  const v113 = vLN08 + vLN09;

  // 🎲 List emoji random biar lucu & variatif
  const emojiSets = {
    kecil: ["🥶", "🔥", "😭", "🙂", "😩", "🤭", "😎", "😔", "🙁", "😌", "🙃", "😼", "😾", "😹", "😽", "😂", "😛", "😝", "🤣"],
    besar: ["🥶", "🔥", "😭", "🙂", "😩", "🤭", "😎", "😔", "🙁", "😌", "🙃", "😼", "😾", "😹", "😽", "😂", "😛", "😝", "🤣"],
    balance: ["💳", "💰", "🏦", "📊", "🪙", "💵", "🤑", "🎰"],
    status: ["⚖️", "🤹", "🎯", "🎮", "🤟", "✨", "🀄", "🎲"]
  };

  // Fungsi random ambil emoji
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  let vLS6 = "";
  if (vLN08 > vLN09) {
    vLS6 = `${pick(emojiSets.status)} *B KURANG ${vLN08 - vLN09} DARI JUMLAH K*`;
  } else if (vLN08 < vLN09) {
    vLS6 = `${pick(emojiSets.status)} *K KURANG ${vLN09 - vLN08} DARI JUMLAH B*`;
  } else {
    vLS6 = `${pick(emojiSets.status)} *K & B Dah Seimbang Nih Gas Rolll ${pick(["☑️","✔️","✅","🎉"])}*`;
  }

  let out = `${pick(emojiSets.kecil)} *KECIL (K)*: ${vA16.join(", ") || "Belum Ada Pick"}: *${vLN08}*\n\n`;
  out += `${pick(emojiSets.besar)} *BESAR (B)*: ${vA17.join(", ") || "Belum Ada Pick"}: *${vLN09}*\n\n`;
  out += vLS6 + "\n\n";
  out += `© 𝗜𝗤𝗕𝗔𝗔𝗟𝗟🥶`;

  vF8(out);
}
break;
      case "restart":
      case "rst":
      case "reconect":
        {
          if (!v90) {
            return vF8("❌ Hanya owner yang bisa merestart bot!");
          }
          vF8("🔄 Bot sedang restart...");
          process.exit(1);
        }
        break;
      case "ht":
      case "h":
      case "z":
        {
          if (!f4(p42.sender)) {
            return;
          }
          if (!v89) {
            return vF8("❌ ᴋʜᴜsᴜs ᴅᴀʟᴀᴍ ɢʀᴜᴘ!");
          }
          let vLS7 = "";
          if (p42.quoted && p42.quoted.text) {
            vLS7 = p42.quoted.text;
          } else if (v88.length > 0) {
            vLS7 = v88.join(" ");
          }
          const v114 = await p41.groupMetadata(p42.chat);
          const v115 = v114.participants.map(p57 => p57.id);
          await p41.sendMessage(p42.chat, {
            text: vLS7 || "*PICK ZAYANG😋*",
            mentions: v115
          }, {
            quoted: p42
          });
        }
        break;
      case "addprem":
        {
          if (!v90) {
            return vF8("❌ ᴋʜᴜsᴜs ʙᴀɴɢ ɪǫʙᴀʟ");
          }
          const v116 = v91.split(" ")[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          const v117 = parseInt(v91.split(" ")[1]) || 1;
          const v118 = Date.now();
          const v119 = v117 * 24 * 60 * 60 * 1000;
          global.premium[v116] = v118 + v119;
          f3();
          vF8("✅ " + v116.split("@")[0] + " sᴇᴋᴀʀᴀɴɢ ᴍᴇɴᴊᴀᴅɪ 𝗨𝘀𝗲𝗿 𝗣𝗿𝗲𝗺𝗶𝘂𝗺 sᴇʟᴀᴍᴀ " + v117 + " ʜᴀʀɪ!\n\n🕓 *ᴇxᴘɪʀᴇᴅ:* " + moment2(global.premium[v116]).format("D/M/YYYY, HH:mm:ss"));
        }
        break;
      case "delprem":
        {
          if (!v90) {
            return vF8("❌ ᴋʜᴜsᴜs ʙᴀɴɢ Dulz×Nobiz");
          }
          const v120 = v91.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          if (!global.premium[v120]) {
            return vF8("❌ Nomor ini bukan user premium.");
          }
          delete global.premium[v120];
          f3();
          vF8("✅ " + v120.split("@")[0] + " telah dihapus dari user premium.");
        }
        break;
      case "listprem":
        {
          if (!v90) {
            return vF8("❌ Hanya Owner yang bisa melihat daftar User Premium!");
          }
          const v121 = Date.now();
          const v122 = Object.entries(global.premium).map(([v123, v124]) => {
            const v125 = v124 - v121;
            const v126 = v125 > 0 ? Math.ceil(v125 / 86400000) : 0;
            const vO13 = {
              jid: v123,
              sisaHari: v126
            };
            return vO13;
          }).filter(p58 => p58.sisaHari > 0);
          if (v122.length === 0) {
            return vF8("⚠️ ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴜsᴇʀ ᴘʀᴇᴍɪᴜᴍ ʙᴏs.");
          }
          const v127 = v122.map((p59, p60) => p60 + 1 + ". @" + p59.jid.replace(/@.+/, "") + " - " + p59.sisaHari + " hari").join("\n");
          p41.sendMessage(p42.chat, {
            text: "📋 *ᴅᴀғᴛᴀʀ ᴜsᴇʀ ᴘʀᴇᴍɪᴜᴍ*\n\n" + v127,
            mentions: v122.map(p61 => p61.jid)
          }, {
            quoted: p42
          });
        }
        break;
      case "check":
        {
          const v128 = p42.sender;
          if (!f4(v128)) {
            return vF8("❌ ᴋᴀsɪᴀɴ ʙᴜᴋᴀɴ ᴜsᴇʀ ᴘʀᴇᴍɪᴜᴍ 🤣.");
          }
          const v129 = global.premium[v128];
          const v130 = moment2.duration(v129 - Date.now());
          vF8("✅ *sᴛᴀᴛᴜs:* ᴘʀᴇᴍɪᴜᴍ\n🕓 *ᴇxᴘɪʀᴇᴅ:* " + moment2(v129).format("D/M/YYYY, HH:mm:ss") + "\n⏳ *sɪsᴀ:* " + v130.days() + " ʜᴀʀɪ " + v130.hours() + " ᴊᴀᴍ");
        }
        break;
      case "owner":
        {
          const fs4 = require("fs");
          let v131;
          try {
            v131 = JSON.parse(fs4.readFileSync("./all/database/owner.json"));
          } catch (e5) {
            return vF8("❌ Terjadi kesalahan saat membaca file owner.json!");
          }
          if (!v131 || v131.length === 0) {
            return vF8("⚠️ Owner belum ditambahkan!");
          }
          const v132 = v131[0].replace("@s.whatsapp.net", "");
          const v133 = "BEGIN:VCARD\nVERSION:3.0\nFN:𝗜𝗤𝗕𝗔𝗔𝗟𝗟🥶\nTEL;waid=" + v132 + ":" + v132 + "\nEND:VCARD";
          const vO14 = {
            vcard: v133
          };
          const vO15 = {
            displayName: "Developer Bot",
            contacts: [vO14]
          };
          const vO16 = {
            contacts: vO15
          };
          const vO17 = {
            quoted: p42
          };
          await p41.sendMessage(v85, vO16, vO17);
        }
        break;
      case "d":
      case "del":
      case "delete":
        {
          if (!f4(p42.sender)) {
            return p42.reply("❌ Fitur ini hanya untuk pengguna premium.");
          }
          if (v89) {
            if (!v90 && !v98) {
              return;
            }
            if (!p42.quoted) {
              return vF8("Reply pesan yang ingin dihapus.");
            }
            if (p42.quoted.sender == v97) {
              p41.sendMessage(p42.chat, {
                delete: {
                  remoteJid: p42.chat,
                  fromMe: true,
                  id: p42.quoted.id,
                  participant: p42.quoted.sender
                }
              });
            } else {
              if (!v99) {
                return vF8(msg.adminbot);
              }
              p41.sendMessage(p42.chat, {
                delete: {
                  remoteJid: p42.chat,
                  fromMe: false,
                  id: p42.quoted.id,
                  participant: p42.quoted.sender
                }
              });
            }
          } else {
            if (!v90) {
              return;
            }
            if (!p42.quoted) {
              return vF8("Reply pesan yang ingin dihapus.");
            }
            p41.sendMessage(p42.chat, {
              delete: {
                remoteJid: p42.chat,
                fromMe: false,
                id: p42.quoted.id,
                participant: p42.quoted.sender
              }
            });
          }
        }
        break;
      case "closegc":
        {
          if (!v89) {
            return vF8("❌ Perintah ini hanya bisa digunakan dalam grup!");
          }
          if (!v98 && !v90) {
            return vF8("❌ Hanya admin/owner yang bisa menutup grup!");
          }
          if (!v99) {
            return vF8("❌ Bot harus menjadi admin!");
          }
          await p41.groupSettingUpdate(p42.chat, "announcement").then(() => vF8("ᴅᴏɴᴇ ᴋɪᴅs.")).catch(() => vF8("⚠️ Gagal menutup grup. Pastikan bot adalah admin!"));
        }
        break;
      case "opengc":
        {
          if (!v89) {
            return vF8("❌ Perintah ini hanya bisa digunakan dalam grup!");
          }
          if (!v98 && !v90) {
            return vF8("❌ Hanya admin/owner yang bisa membuka grup!");
          }
          if (!v99) {
            return vF8("❌ Bot harus menjadi admin!");
          }
          await p41.groupSettingUpdate(p42.chat, "not_announcement").then(() => vF8("ᴅᴏɴᴇ ᴋɪᴅs.")).catch(() => vF8("⚠️ Gagal membuka grup. Pastikan bot adalah admin!"));
        }
        break;
      case "self":
        {
          if (!v90) {
            return vF8("❌ Hanya Owner yang bisa menggunakan perintah ini.");
          }
          global.isPublic = false;
          vF7();
          vF8("🔒 Bot sekarang dalam mode *SELF* (hanya owner yang bisa pakai).");
        }
        break;
      case "public":
        {
          if (!v90) {
            return vF8("❌ Hanya Owner yang bisa menggunakan perintah ini.");
          }
          global.isPublic = true;
          vF7();
          vF8("🌐 Bot sekarang dalam mode *PUBLIC* (semua orang bisa pakai).");
        }
        break;
      case "bv":
      case "balv":
        {
          if (!f4(p42.sender)) {
            return;
          }
          if (!p42.quoted || !p42.quoted.text) {
            return vF8("*OPEN LE TENANAN SU!!😡😡 BAJINGAN*");
          }
          const v134 = p42.quoted.text.split("\n").filter(p63 => p63.trim() !== "");
          let vO18 = {};
          let vLN010 = 0;
          let v135 = null;
          v134.forEach(p64 => {
            const v136 = p64.match(/^(.+?)\s*:/);
            if (v136) {
              v135 = v136[1].trim();
              vO18[v135] = [];
            } else if (v135) {
              const v137 = p64.match(/(\d+)\s*(A|P|LF)?/i);
              if (v137) {
                const vParseInt8 = parseInt(v137[1]);
                vO18[v135].push(vParseInt8);
                vLN010 += vParseInt8;
              }
            }
          });
          let v138 = Object.entries(vO18).map(([v139, v140]) => {
            let v141 = v140.reduce((p65, p66) => p65 + p66, 0);
            return "📊 *" + v139 + "* : " + (v140.join(", ") || "Belum Ada Pick") + ": *" + v141 + "*\n";
          }).join("\n");
          let v142 = Object.keys(vO18);
          let vLS8 = "";
          if (v142.length === 2) {
            let v143 = vO18[v142[0]].reduce((p67, p68) => p67 + p68, 0);
            let v144 = vO18[v142[1]].reduce((p69, p70) => p69 + p70, 0);
            if (v143 > v144) {
              vLS8 = "‼️ *" + v142[1] + " Kurang " + (v143 - v144) + " Agar Seimbang Dengan " + v142[0] + "*";
            } else if (v143 < v144) {
              vLS8 = "‼️ *" + v142[0] + " Kurang " + (v144 - v143) + " Agar Seimbang Dengan " + v142[1] + "*";
            } else {
              vLS8 = "⚖️ *Seimbang!* " + v142[0] + " Dan " + v142[1] + " Sama.";
            }
          }
          vF8(v138 + "\n" + vLS8 + "\n💰 *Total Saldo Saat Ini: " + vLN010 + "*n\n© 𝗜𝗤𝗕𝗔𝗔𝗟𝗟🥶");
        }
        break;
        // ===== CASE CLOSE / TUTUP GRUP =====
case "close":
case "closegc":
case "tutup": {
  if (!v89) return vF8("❌ Fitur ini hanya bisa dipakai di *grup*!");
  if (!v98 && !v90) return vF8("⚠️ Fitur ini hanya bisa dipakai oleh *Admin/Owner* grup!");
  if (!v99) return vF8("❌ Bot harus menjadi *Admin* untuk menutup grup!");

  const fs = require("fs");
  const antilinkFile = "./all/database/antilinkmode.json";
  let antilinkDB = {};
  try {
    if (fs.existsSync(antilinkFile)) antilinkDB = JSON.parse(fs.readFileSync(antilinkFile));
  } catch (e) { antilinkDB = {}; }

  antilinkDB[v85] = "antilink1"; // grup ditutup → default antilink1
  fs.writeFileSync(antilinkFile, JSON.stringify(antilinkDB, null, 2));

  await p41.groupSettingUpdate(p42.chat, "announcement")
    .then(() => p41.sendMessage(v85, { react: { text: "☑️", key: p42.key } }))
    .catch(() => vF8("⚠️ Gagal menutup grup. Pastikan bot adalah admin!"));
}
break;

// ===== CASE OPEN / BUKA GRUP =====
case "open":
case "opengc":
case "buka": {
  if (!v89) return vF8("❌ Fitur ini hanya bisa dipakai di *grup*!");
  if (!v98 && !v90) return vF8("⚠️ Fitur ini hanya bisa dipakai oleh *Admin/Owner* grup!");
  if (!v99) return vF8("❌ Bot harus menjadi *Admin* untuk membuka grup!");

  const fs = require("fs");
  const antilinkFile = "./all/database/antilinkmode.json";
  let antilinkDB = {};
  try {
    if (fs.existsSync(antilinkFile)) antilinkDB = JSON.parse(fs.readFileSync(antilinkFile));
  } catch (e) { antilinkDB = {}; }

  // Bisa optional pilih mode antilink saat buka
  // Contoh: .buka antilink1 / .buka antilink2
  let mode = v91?.toLowerCase();
  if (mode !== "antilink1" && mode !== "antilink2") mode = "antilink2"; // default

  antilinkDB[v85] = mode;
  fs.writeFileSync(antilinkFile, JSON.stringify(antilinkDB, null, 2));

  await p41.groupSettingUpdate(p42.chat, "not_announcement")
    .then(() => p41.sendMessage(v85, { react: { text: "☑️", key: p42.key } }))
    .catch(() => vF8("⚠️ Gagal membuka grup. Pastikan bot adalah admin!"));
}
break;
      case "rekapk":
        {
          if (!f4(p42.sender)) {
            return;
          }
          if (!p42.quoted || !p42.quoted.text) {
            return p42.reply("*OPEN LE TENANAN SU!!😡😡 BAJINGAN*");
          }
          const vA18 = [{
            min: 1,
            max: 9,
            biaya: 1
          }, {
            min: 10,
            max: 19,
            biaya: 2
          }, {
            min: 20,
            max: 29,
            biaya: 3
          }, {
            min: 30,
            max: 39,
            biaya: 4
          }, {
            min: 40,
            max: 49,
            biaya: 5
          }, {
            min: 50,
            max: 59,
            biaya: 6
          }, {
            min: 60,
            max: 69,
            biaya: 7
          }, {
            min: 70,
            max: 79,
            biaya: 8
          }, {
            min: 80,
            max: 89,
            biaya: 9
          }, {
            min: 90,
            max: 99,
            biaya: 10
          }, {
            min: 100,
            max: 109,
            biaya: 11
          }, {
            min: 110,
            max: 119,
            biaya: 12
          }, {
            min: 120,
            max: 129,
            biaya: 13
          }, {
            min: 130,
            max: 139,
            biaya: 14
          }, {
            min: 140,
            max: 149,
            biaya: 15
          }, {
            min: 150,
            max: 159,
            biaya: 16
          }, {
            min: 160,
            max: 169,
            biaya: 17
          }, {
            min: 170,
            max: 179,
            biaya: 18
          }, {
            min: 180,
            max: 189,
            biaya: 19
          }, {
            min: 190,
            max: 199,
            biaya: 20
          }, {
            min: 200,
            max: 209,
            biaya: 21
          }, {
            min: 210,
            max: 219,
            biaya: 22
          }, {
            min: 220,
            max: 229,
            biaya: 23
          }, {
            min: 230,
            max: 239,
            biaya: 24
          }, {
            min: 240,
            max: 249,
            biaya: 25
          }, {
            min: 250,
            max: 259,
            biaya: 26
          }, {
            min: 260,
            max: 269,
            biaya: 27
          }, {
            min: 270,
            max: 279,
            biaya: 30
          }, {
            min: 280,
            max: 289,
            biaya: 31
          }, {
            min: 290,
            max: 299,
            biaya: 32
          }, {
            min: 300,
            max: 309,
            biaya: 33
          }, {
            min: 310,
            max: 319,
            biaya: 34
          }, {
            min: 320,
            max: 329,
            biaya: 35
          }, {
            min: 330,
            max: 339,
            biaya: 36
          }, {
            min: 340,
            max: 349,
            biaya: 37
          }, {
            min: 350,
            max: 359,
            biaya: 38
          }, {
            min: 360,
            max: 369,
            biaya: 39
          }, {
            min: 370,
            max: 379,
            biaya: 40
          }, {
            min: 380,
            max: 389,
            biaya: 41
          }, {
            min: 390,
            max: 399,
            biaya: 42
          }, {
            min: 400,
            max: 409,
            biaya: 43
          }, {
            min: 410,
            max: 419,
            biaya: 44
          }, {
            min: 420,
            max: 429,
            biaya: 45
          }, {
            min: 430,
            max: 439,
            biaya: 46
          }, {
            min: 440,
            max: 449,
            biaya: 47
          }, {
            min: 450,
            max: 459,
            biaya: 48
          }, {
            min: 460,
            max: 469,
            biaya: 49
          }, {
            min: 470,
            max: 479,
            biaya: 50
          }, {
            min: 480,
            max: 489,
            biaya: 51
          }, {
            min: 490,
            max: 499,
            biaya: 52
          }, {
            min: 500,
            max: 509,
            biaya: 53
          }, {
            min: 510,
            max: 519,
            biaya: 54
          }, {
            min: 520,
            max: 529,
            biaya: 55
          }, {
            min: 530,
            max: 539,
            biaya: 56
          }, {
            min: 540,
            max: 549,
            biaya: 57
          }, {
            min: 550,
            max: 559,
            biaya: 58
          }, {
            min: 560,
            max: 569,
            biaya: 59
          }, {
            min: 570,
            max: 579,
            biaya: 60
          }, {
            min: 580,
            max: 589,
            biaya: 61
          }, {
            min: 590,
            max: 599,
            biaya: 62
          }, {
            min: 600,
            max: 609,
            biaya: 63
          }, {
            min: 610,
            max: 619,
            biaya: 64
          }, {
            min: 620,
            max: 629,
            biaya: 65
          }, {
            min: 630,
            max: 639,
            biaya: 66
          }, {
            min: 640,
            max: 649,
            biaya: 67
          }, {
            min: 650,
            max: 659,
            biaya: 68
          }, {
            min: 660,
            max: 669,
            biaya: 69
          }, {
            min: 670,
            max: 679,
            biaya: 70
          }, {
            min: 680,
            max: 689,
            biaya: 71
          }, {
            min: 690,
            max: 699,
            biaya: 72
          }, {
            min: 700,
            max: 709,
            biaya: 73
          }, {
            min: 710,
            max: 719,
            biaya: 74
          }, {
            min: 720,
            max: 729,
            biaya: 75
          }, {
            min: 730,
            max: 739,
            biaya: 76
          }, {
            min: 740,
            max: 749,
            biaya: 77
          }, {
            min: 750,
            max: 759,
            biaya: 78
          }, {
            min: 760,
            max: 769,
            biaya: 79
          }, {
            min: 770,
            max: 779,
            biaya: 80
          }, {
            min: 780,
            max: 789,
            biaya: 81
          }, {
            min: 790,
            max: 799,
            biaya: 82
          }, {
            min: 800,
            max: 809,
            biaya: 83
          }, {
            min: 810,
            max: 819,
            biaya: 84
          }, {
            min: 820,
            max: 829,
            biaya: 85
          }, {
            min: 830,
            max: 839,
            biaya: 86
          }, {
            min: 840,
            max: 849,
            biaya: 87
          }, {
            min: 850,
            max: 859,
            biaya: 88
          }, {
            min: 860,
            max: 869,
            biaya: 89
          }, {
            min: 870,
            max: 879,
            biaya: 90
          }, {
            min: 880,
            max: 889,
            biaya: 91
          }, {
            min: 890,
            max: 899,
            biaya: 92
          }, {
            min: 900,
            max: 909,
            biaya: 93
          }, {
            min: 910,
            max: 919,
            biaya: 94
          }, {
            min: 920,
            max: 929,
            biaya: 95
          }, {
            min: 930,
            max: 939,
            biaya: 96
          }, {
            min: 940,
            max: 949,
            biaya: 97
          }, {
            min: 950,
            max: 959,
            biaya: 98
          }, {
            min: 960,
            max: 969,
            biaya: 99
          }, {
            min: 970,
            max: 979,
            biaya: 100
          }, {
            min: 980,
            max: 989,
            biaya: 101
          }, {
            min: 990,
            max: 999,
            biaya: 102
          }, {
            min: 1000,
            max: 1009,
            biaya: 103
          }, {
            min: 1010,
            max: 1019,
            biaya: 104
          }, {
            min: 1020,
            max: 1029,
            biaya: 105
          }, {
            min: 1030,
            max: 1039,
            biaya: 106
          }, {
            min: 1040,
            max: 1049,
            biaya: 107
          }, {
            min: 1050,
            max: 1059,
            biaya: 108
          }, {
            min: 1060,
            max: 1069,
            biaya: 109
          }, {
            min: 1080,
            max: 1089,
            biaya: 110
          }, {
            min: 1090,
            max: 1099,
            biaya: 111
          }, {
            min: 1100,
            max: 1109,
            biaya: 112
          }, {
            min: 1110,
            max: 1119,
            biaya: 113
          }, {
            min: 1120,
            max: 1129,
            biaya: 114
          }, {
            min: 1130,
            max: 1139,
            biaya: 115
          }, {
            min: 1140,
            max: 1149,
            biaya: 116
          }, {
            min: 1150,
            max: 1159,
            biaya: 117
          }, {
            min: 1160,
            max: 1169,
            biaya: 118
          }, {
            min: 1170,
            max: 1179,
            biaya: 119
          }, {
            min: 1180,
            max: 1189,
            biaya: 120
          }, {
            min: 1190,
            max: 1199,
            biaya: 121
          }, {
            min: 1200,
            max: 1209,
            biaya: 122
          }, {
            min: 1210,
            max: 1219,
            biaya: 123
          }, {
            min: 1220,
            max: 1229,
            biaya: 124
          }, {
            min: 1230,
            max: 1239,
            biaya: 125
          }, {
            min: 1240,
            max: 1249,
            biaya: 126
          }, {
            min: 1250,
            max: 1259,
            biaya: 127
          }, {
            min: 1260,
            max: 1269,
            biaya: 128
          }, {
            min: 1270,
            max: 1279,
            biaya: 129
          }, {
            min: 1280,
            max: 1289,
            biaya: 130
          }, {
            min: 1290,
            max: 1299,
            biaya: 131
          }, {
            min: 1300,
            max: 1309,
            biaya: 132
          }, {
            min: 1310,
            max: 1319,
            biaya: 133
          }, {
            min: 1320,
            max: 1329,
            biaya: 134
          }, {
            min: 1330,
            max: 1339,
            biaya: 135
          }, {
            min: 1340,
            max: 1349,
            biaya: 136
          }, {
            min: 1350,
            max: 1359,
            biaya: 137
          }, {
            min: 1360,
            max: 1369,
            biaya: 138
          }, {
            min: 1370,
            max: 1379,
            biaya: 139
          }, {
            min: 1380,
            max: 1389,
            biaya: 140
          }, {
            min: 1390,
            max: 1399,
            biaya: 141
          }, {
            min: 1400,
            max: 1409,
            biaya: 142
          }, {
            min: 1410,
            max: 1419,
            biaya: 143
          }, {
            min: 1420,
            max: 1429,
            biaya: 144
          }, {
            min: 1430,
            max: 1439,
            biaya: 145
          }, {
            min: 1440,
            max: 1449,
            biaya: 146
          }, {
            min: 1450,
            max: 1459,
            biaya: 147
          }, {
            min: 1460,
            max: 1469,
            biaya: 148
          }, {
            min: 1470,
            max: 1479,
            biaya: 149
          }, {
            min: 1480,
            max: 1489,
            biaya: 150
          }, {
            min: 1490,
            max: 1499,
            biaya: 151
          }, {
            min: 1500,
            max: 1509,
            biaya: 152
          }];
          const vF11 = p71 => {
            const v145 = vA18.find(p72 => p71 >= p72.min && p71 <= p72.max);
            if (v145) {
              return v145.biaya;
            } else {
              return 0;
            }
          };
          const v146 = p42.quoted.text.split("\n").map(p73 => p73.trim()).filter(Boolean);
          let v147 = null;
          let vA19 = [];
          let vLN011 = 0;
          v146.forEach(p74 => {
            if (/^k(?:ecil)?\s*:/i.test(p74)) {
              v147 = "kecil";
              return;
            }
            if (/^b(?:esar)?\s*:/i.test(p74)) {
              v147 = "besar";
              return;
            }
            if (v147 === "kecil") {
              const v148 = p74.match(/^(.+?)\s+(\d+)\s*(\S*)$/);
              if (v148) {
                const v149 = v148[1];
                const vParseInt9 = parseInt(v148[2]);
                const v150 = v148[3] || "";
                const v151 = /lf|p|a/i.test(v150);
                const vVF11 = vF11(vParseInt9);
                const v152 = v151 ? vParseInt9 - vVF11 : vParseInt9 * 2 - vVF11;
                vLN011 += vVF11;
                vA19.push(v149.toUpperCase() + " " + vParseInt9 + " \\ " + v152 + (v150 ? " " + v150.toUpperCase() : ""));
              }
            }
          });
          const v153 = "*📊 𝐑𝐄𝐊𝐀𝐏 𝐊𝐄𝐂𝐈𝐋:*\n\n" + (vA19.length ? vA19.join("\n") : "Tidak ada");
return p42.reply(v153 + "\n\n© 𝗜𝗤𝗕𝗔𝗔𝗟𝗟🥶");
        }
        break;
      case "rekapb":
        {
          if (!f4(p42.sender)) {
            return;
          }
          if (!p42.quoted || !p42.quoted.text) {
            return vF8("*OPEN LE TENANAN SU!!😡😡 BAJINGAN*");
          }
          const vA20 = [{
            min: 1,
            max: 9,
            biaya: 1
          }, {
            min: 10,
            max: 19,
            biaya: 2
          }, {
            min: 20,
            max: 29,
            biaya: 3
          }, {
            min: 30,
            max: 39,
            biaya: 4
          }, {
            min: 40,
            max: 49,
            biaya: 5
          }, {
            min: 50,
            max: 59,
            biaya: 6
          }, {
            min: 60,
            max: 69,
            biaya: 7
          }, {
            min: 70,
            max: 79,
            biaya: 8
          }, {
            min: 80,
            max: 89,
            biaya: 9
          }, {
            min: 90,
            max: 99,
            biaya: 10
          }, {
            min: 100,
            max: 109,
            biaya: 11
          }, {
            min: 110,
            max: 119,
            biaya: 12
          }, {
            min: 120,
            max: 129,
            biaya: 13
          }, {
            min: 130,
            max: 139,
            biaya: 14
          }, {
            min: 140,
            max: 149,
            biaya: 15
          }, {
            min: 150,
            max: 159,
            biaya: 16
          }, {
            min: 160,
            max: 169,
            biaya: 17
          }, {
            min: 170,
            max: 179,
            biaya: 18
          }, {
            min: 180,
            max: 189,
            biaya: 19
          }, {
            min: 190,
            max: 199,
            biaya: 20
          }, {
            min: 200,
            max: 209,
            biaya: 21
          }, {
            min: 210,
            max: 219,
            biaya: 22
          }, {
            min: 220,
            max: 229,
            biaya: 23
          }, {
            min: 230,
            max: 239,
            biaya: 24
          }, {
            min: 240,
            max: 249,
            biaya: 25
          }, {
            min: 250,
            max: 259,
            biaya: 26
          }, {
            min: 260,
            max: 269,
            biaya: 27
          }, {
            min: 270,
            max: 279,
            biaya: 30
          }, {
            min: 280,
            max: 289,
            biaya: 31
          }, {
            min: 290,
            max: 299,
            biaya: 32
          }, {
            min: 300,
            max: 309,
            biaya: 33
          }, {
            min: 310,
            max: 319,
            biaya: 34
          }, {
            min: 320,
            max: 329,
            biaya: 35
          }, {
            min: 330,
            max: 339,
            biaya: 36
          }, {
            min: 340,
            max: 349,
            biaya: 37
          }, {
            min: 350,
            max: 359,
            biaya: 38
          }, {
            min: 360,
            max: 369,
            biaya: 39
          }, {
            min: 370,
            max: 379,
            biaya: 40
          }, {
            min: 380,
            max: 389,
            biaya: 41
          }, {
            min: 390,
            max: 399,
            biaya: 42
          }, {
            min: 400,
            max: 409,
            biaya: 43
          }, {
            min: 410,
            max: 419,
            biaya: 44
          }, {
            min: 420,
            max: 429,
            biaya: 45
          }, {
            min: 430,
            max: 439,
            biaya: 46
          }, {
            min: 440,
            max: 449,
            biaya: 47
          }, {
            min: 450,
            max: 459,
            biaya: 48
          }, {
            min: 460,
            max: 469,
            biaya: 49
          }, {
            min: 470,
            max: 479,
            biaya: 50
          }, {
            min: 480,
            max: 489,
            biaya: 51
          }, {
            min: 490,
            max: 499,
            biaya: 52
          }, {
            min: 500,
            max: 509,
            biaya: 53
          }, {
            min: 510,
            max: 519,
            biaya: 54
          }, {
            min: 520,
            max: 529,
            biaya: 55
          }, {
            min: 530,
            max: 539,
            biaya: 56
          }, {
            min: 540,
            max: 549,
            biaya: 57
          }, {
            min: 550,
            max: 559,
            biaya: 58
          }, {
            min: 560,
            max: 569,
            biaya: 59
          }, {
            min: 570,
            max: 579,
            biaya: 60
          }, {
            min: 580,
            max: 589,
            biaya: 61
          }, {
            min: 590,
            max: 599,
            biaya: 62
          }, {
            min: 600,
            max: 609,
            biaya: 63
          }, {
            min: 610,
            max: 619,
            biaya: 64
          }, {
            min: 620,
            max: 629,
            biaya: 65
          }, {
            min: 630,
            max: 639,
            biaya: 66
          }, {
            min: 640,
            max: 649,
            biaya: 67
          }, {
            min: 650,
            max: 659,
            biaya: 68
          }, {
            min: 660,
            max: 669,
            biaya: 69
          }, {
            min: 670,
            max: 679,
            biaya: 70
          }, {
            min: 680,
            max: 689,
            biaya: 71
          }, {
            min: 690,
            max: 699,
            biaya: 72
          }, {
            min: 700,
            max: 709,
            biaya: 73
          }, {
            min: 710,
            max: 719,
            biaya: 74
          }, {
            min: 720,
            max: 729,
            biaya: 75
          }, {
            min: 730,
            max: 739,
            biaya: 76
          }, {
            min: 740,
            max: 749,
            biaya: 77
          }, {
            min: 750,
            max: 759,
            biaya: 78
          }, {
            min: 760,
            max: 769,
            biaya: 79
          }, {
            min: 770,
            max: 779,
            biaya: 80
          }, {
            min: 780,
            max: 789,
            biaya: 81
          }, {
            min: 790,
            max: 799,
            biaya: 82
          }, {
            min: 800,
            max: 809,
            biaya: 83
          }, {
            min: 810,
            max: 819,
            biaya: 84
          }, {
            min: 820,
            max: 829,
            biaya: 85
          }, {
            min: 830,
            max: 839,
            biaya: 86
          }, {
            min: 840,
            max: 849,
            biaya: 87
          }, {
            min: 850,
            max: 859,
            biaya: 88
          }, {
            min: 860,
            max: 869,
            biaya: 89
          }, {
            min: 870,
            max: 879,
            biaya: 90
          }, {
            min: 880,
            max: 889,
            biaya: 91
          }, {
            min: 890,
            max: 899,
            biaya: 92
          }, {
            min: 900,
            max: 909,
            biaya: 93
          }, {
            min: 910,
            max: 919,
            biaya: 94
          }, {
            min: 920,
            max: 929,
            biaya: 95
          }, {
            min: 930,
            max: 939,
            biaya: 96
          }, {
            min: 940,
            max: 949,
            biaya: 97
          }, {
            min: 950,
            max: 959,
            biaya: 98
          }, {
            min: 960,
            max: 969,
            biaya: 99
          }, {
            min: 970,
            max: 979,
            biaya: 100
          }, {
            min: 980,
            max: 989,
            biaya: 101
          }, {
            min: 990,
            max: 999,
            biaya: 102
          }, {
            min: 1000,
            max: 1009,
            biaya: 103
          }, {
            min: 1010,
            max: 1019,
            biaya: 104
          }, {
            min: 1020,
            max: 1029,
            biaya: 105
          }, {
            min: 1030,
            max: 1039,
            biaya: 106
          }, {
            min: 1040,
            max: 1049,
            biaya: 107
          }, {
            min: 1050,
            max: 1059,
            biaya: 108
          }, {
            min: 1060,
            max: 1069,
            biaya: 109
          }, {
            min: 1080,
            max: 1089,
            biaya: 110
          }, {
            min: 1090,
            max: 1099,
            biaya: 111
          }, {
            min: 1100,
            max: 1109,
            biaya: 112
          }, {
            min: 1110,
            max: 1119,
            biaya: 113
          }, {
            min: 1120,
            max: 1129,
            biaya: 114
          }, {
            min: 1130,
            max: 1139,
            biaya: 115
          }, {
            min: 1140,
            max: 1149,
            biaya: 116
          }, {
            min: 1150,
            max: 1159,
            biaya: 117
          }, {
            min: 1160,
            max: 1169,
            biaya: 118
          }, {
            min: 1170,
            max: 1179,
            biaya: 119
          }, {
            min: 1180,
            max: 1189,
            biaya: 120
          }, {
            min: 1190,
            max: 1199,
            biaya: 121
          }, {
            min: 1200,
            max: 1209,
            biaya: 122
          }, {
            min: 1210,
            max: 1219,
            biaya: 123
          }, {
            min: 1220,
            max: 1229,
            biaya: 124
          }, {
            min: 1230,
            max: 1239,
            biaya: 125
          }, {
            min: 1240,
            max: 1249,
            biaya: 126
          }, {
            min: 1250,
            max: 1259,
            biaya: 127
          }, {
            min: 1260,
            max: 1269,
            biaya: 128
          }, {
            min: 1270,
            max: 1279,
            biaya: 129
          }, {
            min: 1280,
            max: 1289,
            biaya: 130
          }, {
            min: 1290,
            max: 1299,
            biaya: 131
          }, {
            min: 1300,
            max: 1309,
            biaya: 132
          }, {
            min: 1310,
            max: 1319,
            biaya: 133
          }, {
            min: 1320,
            max: 1329,
            biaya: 134
          }, {
            min: 1330,
            max: 1339,
            biaya: 135
          }, {
            min: 1340,
            max: 1349,
            biaya: 136
          }, {
            min: 1350,
            max: 1359,
            biaya: 137
          }, {
            min: 1360,
            max: 1369,
            biaya: 138
          }, {
            min: 1370,
            max: 1379,
            biaya: 139
          }, {
            min: 1380,
            max: 1389,
            biaya: 140
          }, {
            min: 1390,
            max: 1399,
            biaya: 141
          }, {
            min: 1400,
            max: 1409,
            biaya: 142
          }, {
            min: 1410,
            max: 1419,
            biaya: 143
          }, {
            min: 1420,
            max: 1429,
            biaya: 144
          }, {
            min: 1430,
            max: 1439,
            biaya: 145
          }, {
            min: 1440,
            max: 1449,
            biaya: 146
          }, {
            min: 1450,
            max: 1459,
            biaya: 147
          }, {
            min: 1460,
            max: 1469,
            biaya: 148
          }, {
            min: 1470,
            max: 1479,
            biaya: 149
          }, {
            min: 1480,
            max: 1489,
            biaya: 150
          }, {
            min: 1490,
            max: 1499,
            biaya: 151
          }, {
            min: 1500,
            max: 1509,
            biaya: 152
          }];
          const vF12 = p75 => {
            const v154 = vA20.find(p76 => p75 >= p76.min && p75 <= p76.max);
            if (v154) {
              return v154.biaya;
            } else {
              return 0;
            }
          };
          const v155 = p42.quoted.text.split("\n").map(p77 => p77.trim()).filter(Boolean);
          let v156 = null;
          let vA21 = [];
          let vLN012 = 0;
          v155.forEach(p78 => {
            if (/^k(?:ecil)?\s*:/i.test(p78)) {
              v156 = "kecil";
              return;
            }
            if (/^b(?:esar)?\s*:/i.test(p78)) {
              v156 = "besar";
              return;
            }
            if (v156 === "besar") {
              const v157 = p78.match(/^(.+?)\s+(\d+)\s*(\S*)$/);
              if (v157) {
                const v158 = v157[1];
                const vParseInt10 = parseInt(v157[2]);
                const v159 = v157[3] || "";
                const v160 = /lf|p|a/i.test(v159);
                const vVF12 = vF12(vParseInt10);
                const v161 = v160 ? vParseInt10 - vVF12 : vParseInt10 * 2 - vVF12;
                vLN012 += vVF12;
                vA21.push(v158.toUpperCase() + " " + vParseInt10 + " \\ " + v161 + (v159 ? " " + v159.toUpperCase() : ""));
              }
            }
          });
          const v162 = "*📊 𝐑𝐄𝐊𝐀𝐏 𝐁𝐄𝐒𝐀𝐑:*\n\n" + (vA21.length ? vA21.join("\n") : "Tidak ada");
return vF8(v162 + "\n\n© 𝗜𝗤𝗕𝗔𝗔𝗟𝗟🥶");
        }
        break;
      case "script":
        {
          const v163 = "\n*📦 INFORMASI SCRIPT WHATSAPP BOT*\nDapatkan Seluruh Informasi Script Dengan Cara\nHubungi developer untuk info dan pembelian:\nhttps://wa.me/6282189170257 (Chat Developer)\n\n*Note:* Script tidak dijual ke sembarang orang, wajib bertanggung jawab atas penggunaannya.\n    ".trim();
          return vF8(v163);
        }
        break;
      case "harga":
        {
          const v164 = `
\n*💻 HARGA SEWA WHATSAPP BOT*

Berikut daftar harga sewa bot:

• 1 Minggu  : Rp 10.000
• 1 Bulan   : Rp 25.000

Fasilitas:
- Akses fitur premium
- Bantuan setup
- Update fitur terbaru
    
*CHAT : wa.me/6285643127081*
   
© 𝗜𝗤𝗕𝗔𝗔𝗟𝗟🥶\n`.trim();
          return vF8(v164);
        }
        break;
      case "akses":
        {
          const v165 = "\n*💻 HARGA AKSES WHATSAPP BOT*\n\nBerikut daftar harga akses bot:\n\n• 1 Minggu  : Rp 10.000\n• 1 Bulan   : Rp 25.000\n• Permanen   : Rp CLOSE\n\nFasilitas:\n- Akses fitur premium\n- Bantuan setup\n- Update fitur terbaru\n\n*Minat sewa?*\nChat Developer di sini:\nhttps://wa.me/6285643127081 (Developer Bot Bal)\n    ".trim();
          return vF8(v165);
        }
        break;
      case "kick":
        {
          if (!f4(p42.sender)) {
            return vF8("❌ Fitur ini hanya untuk pengguna premium.");
          }
          if (!v89) {
            return vF8("❌ Perintah ini hanya bisa digunakan dalam grup!");
          }
          if (!v90 && !v98) {
            return vF8("❌ Hanya Admin atau Owner yang bisa menggunakan perintah ini!");
          }
          const v166 = p41.user.id.split(":")[0] + "@s.whatsapp.net";
          const v167 = v96.participants.find(p79 => p79.id === v166)?.admin;
          if (!v167) {
            return vF8("❌ ᴀᴅᴍɪɴɪɴ ɢᴡ ᴅᴜʟᴜ ʙᴀɴɢ");
          }
          let vA22 = [];
          if (p42.mentionedJid && p42.mentionedJid.length > 0) {
            vA22 = p42.mentionedJid;
          } else if (v88.length > 0) {
            vA22 = v88.map(p80 => p80.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
          } else if (p42.quoted && p42.quoted.sender) {
            vA22 = [p42.quoted.sender];
          } else {
            return vF8("⚠️ Format salah! Gunakan: .kick @user / .kick 628xxx / reply pesan user.");
          }
          for (let v168 of vA22) {
            if (v168 === v166) {
              return vF8("❌ ᴇɪᴛs ɢᴀʙɪsᴀ");
            }
            if (v168 === p42.sender) {
              return vF8("❌ Tidak bisa mengeluarkan diri sendiri!");
            }
            await p41.groupParticipantsUpdate(v85, [v168], "remove").then(() => vF8("*BYE KIDS*" + v168.split("@")[0] + "*")).catch(() => vF8("⚠️ Gagal mengeluarkan *" + v168.split("@")[0] + "*."));
          }
        }
        break;
        case "back":
        {
          if (!f4(p42.sender)) {
            return vF8("❌ Fitur ini hanya untuk pengguna premium.");
          }

          const userFile = "./all/database/userdata.json";
          const gameFile = "./all/database/gamehistory.json";

          let userData = {};
          let gameData = {};

          try {
            if (fs3.existsSync(userFile)) {
              userData = JSON.parse(fs3.readFileSync(userFile));
            }
          } catch (e) {
            userData = {};
          }

          try {
            if (fs3.existsSync(gameFile)) {
              gameData = JSON.parse(fs3.readFileSync(gameFile));
            }
          } catch (e) {
            gameData = {};
          }

          const id = p42.sender;

          if (!userData[id]) userData[id] = {};
          if (!userData[id].backupSaldo) userData[id].backupSaldo = {};
          if (!userData[id].saldo) userData[id].saldo = {};

          userData[id].saldo = { ...userData[id].backupSaldo };

          if (Array.isArray(gameData[id]) && gameData[id].length > 0) {
            gameData[id].pop();
          }

          fs3.writeFileSync(userFile, JSON.stringify(userData, null, 2));
          fs3.writeFileSync(gameFile, JSON.stringify(gameData, null, 2));

          await p41.sendMessage(v85, { react: { text: "☑️", key: p42.key } });
        }
        break;
        case "geser":
        {
          if (!f4(p42.sender)) {
            return vF8("❌ KHUSUS PREMIUM");
          }

          const [dariRaw, jumlahStr, keRaw] = v88;
          if (!dariRaw || !jumlahStr || !keRaw) {
            return vF8("❗ Format: .geser IQBAL 100 Arya");
          }

          const dari = dariRaw.trim().toUpperCase();
          const ke = keRaw.trim().toUpperCase();
          const jumlah = parseInt(jumlahStr);

          if (isNaN(jumlah) || jumlah <= 0) {
            return vF8("❗ Jumlah tidak valid.");
          }

          const userFile = "./all/database/userdata.json";
          let userData = {};

          try {
            if (fs3.existsSync(userFile)) {
              userData = JSON.parse(fs3.readFileSync(userFile));
            }
          } catch (e) {
            userData = {};
          }

          const id = p42.sender;

          if (!userData[id]) userData[id] = {};
          if (!userData[id].saldo) userData[id].saldo = {};

          const saldoPengirim = userData[id].saldo[dari] || 0;
          if (saldoPengirim < jumlah) {
            return vF8(`❌ Saldo ${dari} tidak cukup.`);
          }

          // Proses geser saldo
          userData[id].saldo[dari] -= jumlah;
          userData[id].saldo[ke] = (userData[id].saldo[ke] || 0) + jumlah;

          fs3.writeFileSync(userFile, JSON.stringify(userData, null, 2));

          // Animasi loading sederhana
          const loadingSteps = ["•-----", "••----", "•••---", "••••--", "•••••-", "••••••"];
          const pesanAwal = await p41.sendMessage(v85, { text: loadingSteps[0] }, { quoted: p42 });

          for (let i = 1; i < loadingSteps.length; i++) {
            await new Promise(r => setTimeout(r, 200));
            await p41.sendMessage(v85, { text: loadingSteps[i], edit: pesanAwal.key });
          }

          const saldoPenerima = userData[id].saldo[ke];
          const saldoAkhirPengirim = userData[id].saldo[dari];

          const hasil = `✅ SUKSES MENGGESER SALDO\n\n📤 ${dari} : ${saldoAkhirPengirim}\n📥 ${ke} : ${saldoPenerima}`;
          await new Promise(r => setTimeout(r, 300));
          await p41.sendMessage(v85, { text: hasil, edit: pesanAwal.key });
        }
        break;
        // ===== CASE LW =====
case "lw": {
  if (!p42.isGroup) break; // hanya untuk grup
  if (!f4(p42.sender)) return;

  const fs = require("fs");
  const userFile = "./all/database/userdata.json";
  const gameFile = "./all/database/gamehistory.json";
  const lwFile = "./all/database/lwinfo.json";
  const judulFile = "./all/database/judulinfo.json";

  // baca semua file data
  const userData = fs.existsSync(userFile) ? JSON.parse(fs.readFileSync(userFile)) : {};
  const gameData = fs.existsSync(gameFile) ? JSON.parse(fs.readFileSync(gameFile)) : {};
  const lwData = fs.existsSync(lwFile) ? JSON.parse(fs.readFileSync(lwFile)) : {};
  const judulData = fs.existsSync(judulFile) ? JSON.parse(fs.readFileSync(judulFile)) : {};

  const id = p42.sender;
  const lwText = lwData[id] || "⁉️ Belum ada LW diset, ketik *.setlw* dulu!";
  const judulSaldo = judulData[id]?.saldo || "SALDO PEMAIN";
  const judulMinus = judulData[id]?.minus || "SALDO MINUS/LF";

  const games = gameData[id] || [];

  // header & waktu
  const now = new Date();
  const hariList = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  const hari = hariList[now.getDay()];
  const tanggal = now.getDate();
  const bulan = String(now.getMonth() + 1).padStart(2, "0");
  const tahun = now.getFullYear();
  const jam = now.toTimeString().split(" ")[0];

  let output = `${lwText}\n\n⋆ ♛ ${hari.toUpperCase()}, ${tanggal}-${bulan}-${tahun}\n\n`;

  // tampilkan riwayat game
  if (games.length === 0) {
    output += `LW FRESH🥱.\n\n`;
  } else {
    games.forEach((g, i) => {
      output += `*GAME ${i + 1}* : ${g}\n`;
    });
    output += `\n`;
  }

  // ambil saldo pemain
  const saldo = userData[id]?.saldo || {};
  const semuaNama = Object.entries(saldo);

  // positif & negatif diurutkan
  const positif = semuaNama
    .filter(([_, val]) => val > 0)
    .sort((a, b) => b[1] - a[1]) // besar ke kecil
    .map(([nama, val]) => `*${nama.toUpperCase()} ${val}*`);

  const negatif = semuaNama
    .filter(([nama, val]) => val < 0 && userData[id]?.pernahLF?.[nama])
    .sort((a, b) => a[1] - b[1]) // paling minus ke kecil
    .map(([nama, val]) => `*${nama.toUpperCase()} ${val}*`);

  // total saldo
  const totalPositif = semuaNama
    .filter(([_, val]) => val > 0)
    .reduce((sum, [_, val]) => sum + val, 0);

  const totalNegatif = semuaNama
    .filter(([nama, val]) => val < 0 && userData[id]?.pernahLF?.[nama])
    .reduce((sum, [_, val]) => sum + val, 0);

  // output akhir
  output += `*${judulSaldo} : ${totalPositif}*\n${positif.join("\n") || "-"}\n\n`;
  output += `*${judulMinus} : ${totalNegatif}*\n${negatif.join("\n") || "-"}`;

  vF8(output);

  if (games.length > 0) {
    setTimeout(() => {
      vF8(`_KETIK .BACK UNTUK CANCEL GAME TERAKHIR & KEMBALIKAN SALDO_`);
    }, 2000);
  }
}
break;
// ===== CASE WINB / WINK =====
case 'winb':
case 'wink': {
  if (!f4(p42.sender)) {
    return vF8("❌ Fitur ini hanya untuk user premium.");
  }

  const winner = v87 === 'winb' ? 'B' : 'K';
  const skor = v88[0];
  if (!skor) return vF8("*OPEN LE TENANAN SU!!😡😡 BAJINGAN*");
  if (!p42.quoted || !p42.quoted.text) return vF8("*OPEN LE TENANAN SU!!😡😡 BAJINGAN*");

  const fs = require("fs");
  const path = "./all/database";
  const userFile = `${path}/userdata.json`;
  const gameLogFile = `${path}/gamehistory.json`;
  const jancoFile = `${path}/janco.json`;
  const lwFile = `${path}/lwinfo.json`;
  const judulFile = `${path}/judulinfo.json`;
  const infoFile = `${path}/info.json`;

  // Load data
  const userData = fs.existsSync(userFile) ? JSON.parse(fs.readFileSync(userFile)) : {};
  const gameLog = fs.existsSync(gameLogFile) ? JSON.parse(fs.readFileSync(gameLogFile)) : {};
  const jancoData = fs.existsSync(jancoFile) ? JSON.parse(fs.readFileSync(jancoFile)) : {};
  const lwData = fs.existsSync(lwFile) ? JSON.parse(fs.readFileSync(lwFile)) : {};
  const judulData = fs.existsSync(judulFile) ? JSON.parse(fs.readFileSync(judulFile)) : {};
  const infoData = fs.existsSync(infoFile) ? JSON.parse(fs.readFileSync(infoFile)) : {};

  const id = p42.sender;
  const info = infoData[id] || { waktu: "WIB" };

  if (!userData[id]) userData[id] = {};
  userData[id].saldo = userData[id].saldo || {};
  userData[id].pernahLF = userData[id].pernahLF || {};

  const lwText = lwData[id] || '⁉️ MINIMAL SET LW';
  const judulSaldo = judulData[id]?.saldo || "SALDO PEMAIN";
  const judulMinus = judulData[id]?.minus || "SALDO MINUS";

  // Parsing taruhan
  const lines = p42.quoted.text.split('\n');
  let current = '';
  let data = { B: [], K: [] };

  for (let line of lines) {
    line = line.trim();
    if (/^b(?:esar)?\s*:?\s*$/i.test(line)) { current = 'B'; continue; }
    if (/^k(?:ecil)?\s*:?\s*$/i.test(line)) { current = 'K'; continue; }

    const match = line.match(/^([^\d]+)\s+(\d+)[pP]?\s*(lf)?$/i);
    if (!match || !current) continue;

    let [, nama, angkaStr, lfFlag] = match;
    nama = nama.trim().toUpperCase();
    const angka = parseInt(angkaStr);
    const huruf = lfFlag ? 'lf' : '';

    if (huruf === 'lf') {
      userData[id].pernahLF[nama] = true;
    }

    data[current].push({ nama, angka, huruf });
  }

  userData[id].backupSaldo = JSON.parse(JSON.stringify(userData[id].saldo));

  // === RUMUS FEE ===
  const getFee = (n) => {
    if (n <= 9) return 1;
    if (n <= 19) return 2;
    if (n <= 29) return 3;
    if (n <= 39) return 4;
    if (n <= 49) return 5;
    if (n <= 59) return 6;
    if (n <= 69) return 7;
    if (n <= 79) return 8;
    if (n <= 89) return 9;
    if (n <= 99) return 10;
    if (n <= 109) return 11;
    if (n <= 119) return 12;
    if (n <= 129) return 13;
    if (n <= 139) return 14;
    if (n <= 149) return 15;
    if (n <= 159) return 16;
    if (n <= 169) return 17;
    if (n <= 179) return 18;
    if (n <= 189) return 19;
    if (n <= 199) return 20;
    if (n <= 209) return 21;
    if (n <= 219) return 22;
    if (n <= 229) return 23;
    if (n <= 239) return 24;
    if (n <= 249) return 25;
    if (n <= 259) return 26;
    if (n <= 269) return 27;
    if (n <= 279) return 28;
    if (n <= 289) return 29;
    if (n <= 299) return 30;
    if (n <= 309) return 31;
    if (n <= 319) return 32;
    if (n <= 329) return 33;
    if (n <= 339) return 34;
    if (n <= 349) return 35;
    if (n <= 359) return 36;
    if (n <= 369) return 37;
    if (n <= 379) return 38;
    if (n <= 389) return 39;
    if (n <= 399) return 40;
    if (n <= 409) return 41;
    if (n <= 419) return 42;
    if (n <= 429) return 43;
    if (n <= 439) return 44;
    if (n <= 449) return 45;
    if (n <= 459) return 46;
    if (n <= 469) return 47;
    if (n <= 479) return 48;
    if (n <= 489) return 49;
    if (n <= 499) return 50;
    if (n <= 509) return 51;
    if (n <= 519) return 52;
    if (n <= 529) return 53;
    if (n <= 539) return 54;
    if (n <= 549) return 55;
    if (n <= 559) return 56;
    if (n <= 569) return 57;
    if (n <= 579) return 58;
    if (n <= 589) return 59;
    if (n <= 599) return 60;
    if (n <= 609) return 61;
    if (n <= 619) return 62;
    if (n <= 629) return 63;
    if (n <= 639) return 64;
    if (n <= 649) return 65;
    if (n <= 659) return 66;
    if (n <= 669) return 67;
    if (n <= 679) return 68;
    if (n <= 689) return 69;
    if (n <= 699) return 70;
    if (n <= 709) return 71;
    if (n <= 719) return 72;
    if (n <= 729) return 73;
    if (n <= 739) return 74;
    if (n <= 749) return 75;
    if (n <= 759) return 76;
    if (n <= 769) return 77;
    if (n <= 779) return 78;
    if (n <= 789) return 79;
    if (n <= 799) return 80;
    if (n <= 809) return 81;

    const extra = Math.floor((n - 809) / 10) + 1;
    return 81 + extra;
  };

  // Hitung saldo tiap pemain
  for (let team of ['B', 'K']) {
    const menang = team === winner;
    for (let { nama, angka, huruf } of data[team]) {
      const fee = getFee(angka);
      const sAwal = userData[id].saldo[nama] ?? 0;
      let sAkhir = 0;

      if (menang) {
        if (huruf === 'lf') {
          sAkhir = sAwal + (angka - fee);
        } else {
          sAkhir = sAwal > 0 ? sAwal + (angka - fee) : angka * 2 - fee;
        }
      } else {
        if (huruf === 'lf') {
          sAkhir = sAwal - angka;
        } else {
          sAkhir = sAwal - angka;
          if (sAwal <= 0) sAkhir = 0;
          if (sAkhir < 0) sAkhir = 0;
        }
      }

      userData[id].saldo[nama] = sAkhir;
    }
  }

  // === SIMPAN ===
  const totalSkor = data[winner].reduce((sum, o) => sum + o.angka, 0);
  const totalFee = data[winner].reduce((sum, o) => sum + getFee(o.angka), 0);

  jancoData[id] = { n: totalSkor, b: totalFee };
  fs.writeFileSync(jancoFile, JSON.stringify(jancoData, null, 2));
  fs.writeFileSync(userFile, JSON.stringify(userData, null, 2));

  if (!gameLog[id]) gameLog[id] = [];
  gameLog[id].push(`${winner} ${skor} (${totalSkor}) \\ ${totalFee}`);
  fs.writeFileSync(gameLogFile, JSON.stringify(gameLog, null, 2));

  // === OUTPUT ===
  const now = new Date();
  const offset = info.waktu === "WITA" ? 8 : info.waktu === "WIT" ? 9 : 7;
  const local = new Date(now.getTime() + offset * 3600000);
  const hariList = ["MINGGU","SENIN","SELASA","RABU","KAMIS","JUMAT","SABTU"];
  const hari = hariList[local.getDay()];
  const tglFormatted = `${local.getDate()}-${String(local.getMonth()+1).padStart(2,"0")}-${local.getFullYear()}`;

  let out = `${lwText}\n\n⋆ ♛ ${hari}, ${tglFormatted}\n\n`;
  for (let i = 0; i < gameLog[id].length; i++) {
    out += `GAME ${i + 1} : ${gameLog[id][i]}\n`;
  }

  const semuaNama = Object.entries(userData[id].saldo).sort((a,b)=>b[1]-a[1]);
  const positif = semuaNama.filter(([_, s]) => s > 0).map(([n, s]) => `*${n} ${s}*`);
  const negatif = semuaNama.filter(([n, s]) => s < 0 && userData[id].pernahLF?.[n]).map(([n, s]) => `*${n} ${s}*`);

  const totalPositif = semuaNama.filter(([_, s]) => s > 0).reduce((a, [_, s]) => a + s, 0);
  const totalNegatif = semuaNama.filter(([n, s]) => s < 0 && userData[id].pernahLF?.[n]).reduce((a, [_, s]) => a + s, 0);

  out += `\n*${judulSaldo} : ${totalPositif}*\n${positif.join("\n") || "-"}\n\n`;
  out += `*${judulMinus} : ${totalNegatif}*\n${negatif.join("\n") || "-"}`;

  vF8(out);

  setTimeout(() => {
    vF8(`_KETIK .BACK UNTUK CANCEL GAME TERAKHIR & KEMBALIKAN SALDO_`);
  }, 2000);
}
break;
// ===== CASE SETLW =====
case 'setlw': {
  // Jika bukan grup, keluar tanpa reply
  if (!p42.isGroup) break;

  // Hanya untuk owner/premium
  if (!f4(p42.sender)) return;

  const fs = require("fs");
  const path = "./all/database";
  const lwFile = `${path}/lwinfo.json`;
  const judulFile = `${path}/judulinfo.json`;

  // Baca data file
  let lwData = fs.existsSync(lwFile) ? JSON.parse(fs.readFileSync(lwFile)) : {};
  let judulData = fs.existsSync(judulFile) ? JSON.parse(fs.readFileSync(judulFile)) : {};

  const id = p42.sender;

  // Gabungkan semua argumen
  const allText = v88.join(" ");
  const lines = allText.split("\n").map(l => l.trim()).filter(l => l);

  if (lines.length === 0) return vF8(
`❌ *Format Salah!*

Gunakan format berikut:

.setlw ADMIN IQBAL
#HAIII
#KELAS TALANG

💡 *Keterangan:*
• Baris pertama → teks utama (bebas)
• Baris ke-2 → #judul saldo
• Baris ke-3 → #judul minus
• # bersifat opsional`
  );

  // Pisahkan baris yang ada '#' dan tidak
  let lwTextLines = [];
  let judulLines = [];

  for (let line of lines) {
    if (line.startsWith("#")) {
      judulLines.push(line.replace(/^#/, "").trim());
    } else {
      lwTextLines.push(line);
    }
  }

  lwData[id] = lwTextLines.join("\n");
  judulData[id] = {
    saldo: judulLines[0] || "SALDO PEMAIN",
    minus: judulLines[1] || "SALDO MINUS"
  };

  // Simpan perubahan
  fs.writeFileSync(lwFile, JSON.stringify(lwData, null, 2));
  fs.writeFileSync(judulFile, JSON.stringify(judulData, null, 2));

  // React ✅
  await p41.sendMessage(v85, { react: { text: "✅", key: p42.key } });

  vF8(`✅ LW berhasil diset!\n\n*LW:* ${lwData[id]}\n*Judul Saldo:* ${judulData[id].saldo}\n*Judul Minus:* ${judulData[id].minus}`);
}
break;
// ===== CASE LW =====
case "saldo": {
  if (!p42.isGroup) break; // hanya untuk grup
  if (!f4(p42.sender)) return;

  const fs = require("fs");
  const userFile = "./all/database/userdata.json";
  const judulFile = "./all/database/judulinfo.json";

  // baca file
  const userData = fs.existsSync(userFile) ? JSON.parse(fs.readFileSync(userFile)) : {};
  const judulData = fs.existsSync(judulFile) ? JSON.parse(fs.readFileSync(judulFile)) : {};

  const id = p42.sender;

  const judulSaldo = judulData[id]?.saldo || "SALDO PEMAIN";
  const judulMinus = judulData[id]?.minus || "SALDO MINUS";

  // ambil saldo pemain
  const saldo = userData[id]?.saldo || {};
  const semuaNama = Object.entries(saldo);

  // urutkan
  const positif = semuaNama
    .filter(([_, val]) => val > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([nama, val]) => `*${nama.toUpperCase()} ${val}*`);

  const negatif = semuaNama
    .filter(([nama, val]) => val < 0 && userData[id]?.pernahLF?.[nama])
    .sort((a, b) => a[1] - b[1])
    .map(([nama, val]) => `*${nama.toUpperCase()} ${val}*`);

  // total saldo
  const totalPositif = semuaNama
    .filter(([_, val]) => val > 0)
    .reduce((sum, [_, val]) => sum + val, 0);

  const totalNegatif = semuaNama
    .filter(([nama, val]) => val < 0 && userData[id]?.pernahLF?.[nama])
    .reduce((sum, [_, val]) => sum + val, 0);

  // output akhir (tanpa ADMIN)
  let output = `*${judulSaldo} : ${totalPositif}*\n${positif.join("\n") || "-"}\n\n`;
  output += `*${judulMinus} : ${totalNegatif}*\n${negatif.join("\n") || "-"}`;

  vF8(output);
}
break;
        case "ping":
        {
          const { performance } = require("perf_hooks");
          const moment2 = require("moment-timezone");

          const old = performance.now();
          const speed = (performance.now() - old).toFixed(4);

          const formatRuntime = (seconds) => {
            const hrs = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            return `${hrs} jam ${mins} menit`;
          };

          const waktu = moment2.tz("Asia/Jakarta").format("dddd, DD MMMM YYYY HH:mm:ss");

          const teks = `🎯 *🔥 Respon Cepat!*
📊 *Statistik Bot:*
├ *Respon:* ${speed} ms
├ *Runtime:* ${formatRuntime(process.uptime())}
└ *Waktu:* ${waktu}`;

          await p41.sendMessage(v85, { text: teks }, { quoted: p42 });
        }
        break;
        case "depo":
        {
          if (!f4(p42.sender)) {
            return vF8("❌ KHUSUS PREMIUM");
          }

          const nama = v88[0]?.toUpperCase();
          const jumlah = parseInt(v88[1]);

          if (!nama || isNaN(jumlah) || jumlah <= 0) {
            return vF8("❗ Format salah. Contoh:\n.depo Iqbal 1000");
          }

          const userFile = "./all/database/userdata.json";
          let userData = {};

          try {
            if (fs3.existsSync(userFile)) {
              userData = JSON.parse(fs3.readFileSync(userFile));
            }
          } catch (e) {
            userData = {};
          }

          const id = p42.sender;
          if (!userData[id]) userData[id] = {};
          if (!userData[id].saldo) userData[id].saldo = {};

          userData[id].saldo[nama] = (userData[id].saldo[nama] || 0) + jumlah;

          fs3.writeFileSync(userFile, JSON.stringify(userData, null, 2));

          await p41.sendMessage(v85, { react: { text: "✅", key: p42.key } });
        }
        break;
        case "reset":
        {
          if (!f4(p42.sender)) {
            return vF8("❌ KHUSUS PREMIUM");
          }

          const userFile = "./all/database/userdata.json";
          const gameLogFile = "./all/database/gamehistory.json";

          let userData = {};
          let gameLog = {};

          try {
            if (fs3.existsSync(userFile)) {
              userData = JSON.parse(fs3.readFileSync(userFile));
            }
          } catch (e) {
            userData = {};
          }

          try {
            if (fs3.existsSync(gameLogFile)) {
              gameLog = JSON.parse(fs3.readFileSync(gameLogFile));
            }
          } catch (e) {
            gameLog = {};
          }

          const id = p42.sender;
          if (userData[id]) delete userData[id];
          if (gameLog[id]) delete gameLog[id];

          fs3.writeFileSync(userFile, JSON.stringify(userData, null, 2));
          fs3.writeFileSync(gameLogFile, JSON.stringify(gameLog, null, 2));

          await p41.sendMessage(v85, { react: { text: "✅", key: p42.key } });
        }
        break;
        case "kurang":
        {
          if (!f4(p42.sender)) {
            return vF8("❌ KHUSUS PREMIUM");
          }

          const nama = v88[0]?.toUpperCase();
          const jumlah = parseInt(v88[1]);

          if (!nama || isNaN(jumlah) || jumlah <= 0) {
            return vF8("❗ Format salah. Contoh:\n.kurang Iqbal 500");
          }

          const userFile = "./all/database/userdata.json";
          let userData = {};

          try {
            if (fs3.existsSync(userFile)) {
              userData = JSON.parse(fs3.readFileSync(userFile));
            }
          } catch (e) {
            userData = {};
          }

          const id = p42.sender;
          if (!userData[id]) userData[id] = {};
          if (!userData[id].saldo) userData[id].saldo = {};

          userData[id].saldo[nama] = (userData[id].saldo[nama] || 0) - jumlah;

          fs3.writeFileSync(userFile, JSON.stringify(userData, null, 2));

          await p41.sendMessage(v85, { react: { text: "✅", key: p42.key } });
        }
        break;
        case "edit":
  {
          if (!f4(p42.sender)) {
            return vF8("❌ KHUSUS PREMIUM");
          }

    if (v88.length < 2) {
      return vF8("❌ Format salah!\nContoh: .edit Iqbal 95");
    }

    const nama = v88[0].toUpperCase(); // nama pemain
    const jumlahBaru = parseInt(v88[1]); // angka saldo baru
    if (isNaN(jumlahBaru)) {
      return vF8("❌ Jumlah saldo harus angka!");
    }

    const fs = require("fs");
    const userFile = "./all/database/userdata.json";
    const id = p42.sender;

    // load data user
    let userData = fs.existsSync(userFile)
      ? JSON.parse(fs.readFileSync(userFile))
      : {};

    if (!userData[id]) userData[id] = {};
    if (!userData[id].saldo) userData[id].saldo = {};

    // update saldo
    userData[id].saldo[nama] = jumlahBaru;

    // simpan
    fs.writeFileSync(userFile, JSON.stringify(userData, null, 2));

    vF8(`✅ Saldo *${nama}* berhasil diubah jadi *${jumlahBaru}* 💰`);
  }
  break;
        case "antilink1":
      case "antilink2":
      case "antilinkoff":
        {
          if (!p42.isGroup) {
            return vF8("⚠️ KHUSUS GRUP");
          }
          if (!f4(p42.sender)) {
            return vF8("❌ KHUSUS PREMIUM");
          }

          const antilinkFile = "./all/database/antilinkmode.json";
          let antilinkDB = {};

          try {
            if (fs3.existsSync(antilinkFile)) {
              antilinkDB = JSON.parse(fs3.readFileSync(antilinkFile));
            }
          } catch (e) {
            antilinkDB = {};
          }

          const mode = v87 === "antilinkoff" ? null : v87;
          if (mode) {
            antilinkDB[v85] = mode;
            vF8(`✅ Antilink aktif: *${mode.toUpperCase()}*`);
          } else {
            delete antilinkDB[v85];
            vF8("✅ Antilink dimatikan");
          }

          fs3.writeFileSync(antilinkFile, JSON.stringify(antilinkDB, null, 2));
        }
        break;
        case "eval":
        {
          // hanya untuk owner
          const ownerNumber = "6285643127081@s.whatsapp.net";
          if (p42.sender !== ownerNumber) {
            return vF8("❌ Hanya owner yang bisa pakai fitur ini!");
          }

          if (!v88 || v88.length === 0) {
            return vF8("⚠️ Masukkan kode JS untuk dieksekusi!\nContoh: .eval 2+2");
          }

          try {
            const kode = v88.join(" ");
            let hasil = await eval(`(async () => { ${kode} })()`);
            if (typeof hasil !== "string") hasil = require("util").inspect(hasil);

            await p41.sendMessage(v85, { text: `✅ *Eval Result:*\n\`\`\`${hasil}\`\`\`` }, { quoted: p42 });
          } catch (err) {
            await p41.sendMessage(v85, { text: `❌ *Eval Error:*\n\`\`\`${err}\`\`\`` }, { quoted: p42 });
          }
        }
        break;
        case "remove+":
  {
    if (!f4(p42.sender)) return vF8("❌ Khusus user premium/owner!");

    const fs = require("fs");
    const dbFile = "./all/database/userdata.json";

    function loadDB() {
      try {
        return JSON.parse(fs.readFileSync(dbFile));
      } catch {
        return {};
      }
    }
    function saveDB(data) {
      fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
    }

    let db = loadDB();
    let jid = p42.sender;
    if (!db[jid] || !db[jid].saldo) return vF8("⚠️ Kamu belum punya saldo di database!");

    let [target, jumlahStr] = v91.split(" ");
    let jumlah = parseInt(jumlahStr);
    if (!target || isNaN(jumlah)) return vF8("⚠️ Format: .remove+ <NAMA> <JUMLAH>");

    if (!(target in db[jid].saldo)) return vF8(`⚠️ Saldo ${target} tidak ditemukan.`);

    if (db[jid].saldo[target] > 0) {
      db[jid].saldo[target] -= jumlah;
      if (db[jid].saldo[target] < 0) db[jid].saldo[target] = 0; // biar gak nyebrang ke minus
      saveDB(db);
      vF8(`✅ Saldo *${target}* dikurangi ${jumlah}. Sisa: ${db[jid].saldo[target]}`);
    } else {
      vF8(`⚠️ Saldo ${target} bukan positif (nilainya: ${db[jid].saldo[target]}).`);
    }
  }
  break;

case "remove-":
  {
    if (!f4(p42.sender)) return vF8("❌ Khusus user premium/owner!");

    const fs = require("fs");
    const dbFile = "./all/database/userdata.json";

    function loadDB() {
      try {
        return JSON.parse(fs.readFileSync(dbFile));
      } catch {
        return {};
      }
    }
    function saveDB(data) {
      fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
    }

    let db = loadDB();
    let jid = p42.sender;
    if (!db[jid] || !db[jid].saldo) return vF8("⚠️ Kamu belum punya saldo di database!");

    let [target, jumlahStr] = v91.split(" ");
    let jumlah = parseInt(jumlahStr);
    if (!target || isNaN(jumlah)) return vF8("⚠️ Format: .remove- <NAMA> <JUMLAH>");

    if (!(target in db[jid].saldo)) return vF8(`⚠️ Saldo ${target} tidak ditemukan.`);

    if (db[jid].saldo[target] < 0) {
      db[jid].saldo[target] += jumlah; // karena negatif, tambahkan biar mendekati 0
      if (db[jid].saldo[target] > 0) db[jid].saldo[target] = 0; // biar gak nyebrang ke plus
      saveDB(db);
      vF8(`✅ Hutang *${target}* berkurang ${jumlah}. Sisa: ${db[jid].saldo[target]}`);
    } else {
      vF8(`⚠️ Saldo ${target} bukan negatif (nilainya: ${db[jid].saldo[target]}).`);
    }
  }
  break;
  case "leave":
      case "keluar":
        {
          if (!v90) {
            return vF8("❌ Hanya Owner yang bisa membuat bot keluar grup.");
          }
          if (!v89) {
            return vF8("⚠️ Perintah ini hanya bisa digunakan di dalam grup!");
          }
          try {
            await p41.groupLeave(v85);
            // Kirim pesan konfirmasi ke owner (opsional)
            p41.sendMessage(v97, { text: `✅ Bot sudah keluar dari grup: ${v96.subject}` });
          } catch (e) {
            vF8("❌ Gagal keluar dari grup: " + e.message);
          }
        }
        break;
        case "join":
        {
          if (!f4(p42.sender)) return vF8("❌ Khusus user premium/owner!");
          if (!v91) {
            return vF8("❌ Masukkan link grup WhatsApp!\nContoh: *.join https://chat.whatsapp.com/XXXXXX*");
          }
          let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]+)/;
          let match = v91.match(linkRegex);
          if (!match) {
            return vF8("⚠️ Link grup tidak valid!");
          }
          let inviteCode = match[1];
          try {
            await p41.groupAcceptInvite(inviteCode);
            vF8("✅ Berhasil join grup!");
          } catch (e) {
            vF8("❌ Gagal join grup: " + e.message);
          }
        }
        break;
        case "addowner":
        {
          if (!isOwner) {
            return vF8("❌ Hanya owner utama yang bisa menambahkan owner baru!");
          }
          if (!v91) {
            return vF8("⚠️ Masukkan nomor yang ingin dijadikan owner!\nContoh: *.addowner 628xxxx*");
          }
          const fs4 = require("fs");
          const ownerFile = "./all/database/owner.json";
          let owners = [];
          try {
            if (fs4.existsSync(ownerFile)) {
              owners = JSON.parse(fs4.readFileSync(ownerFile));
            }
          } catch (e) {
            owners = [];
          }

          const newOwner = v91.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          if (owners.includes(newOwner)) {
            return vF8("⚠️ Nomor ini sudah terdaftar sebagai owner.");
          }

          owners.push(newOwner);
          fs4.writeFileSync(ownerFile, JSON.stringify(owners, null, 2));
          vF8("✅ Berhasil menambahkan @" + newOwner.split("@")[0] + " sebagai owner baru!");
          p41.sendMessage(v85, { mentions: [newOwner], text: `Selamat datang owner baru: @${newOwner.split("@")[0]} 🎉` }, { quoted: p42 });
        }
        break;
        case 'hasil': {
  const fs = require("fs");
  const path = "./all/database";
  const gameLogFile = `${path}/gamehistory.json`;

  const gameLog = fs.existsSync(gameLogFile) ? JSON.parse(fs.readFileSync(gameLogFile)) : {};
  const id = p42.sender;

  if (!gameLog[id] || gameLog[id].length === 0) {
    return vF8("❗ Belum ada game yang dicatat.");
  }

  // Ambil semua fee dari log
  const fees = gameLog[id].map(line => {
    const match = line.match(/\\\s+(\d+)$/); // cari angka fee di akhir
    return match ? parseInt(match[1]) : 0;
  });

  if (fees.length === 0) {
    return vF8("❗ Tidak ada data fee yang bisa dihitung.");
  }

  // Rincian tiap game
  let detail = fees.map((f, i) => `GAME ${i + 1} = ${f}`).join('\n');

  // Penjumlahan + total
  const sumText = fees.join(' + ');
  const totalFee = fees.reduce((a, b) => a + b, 0);

  let out = `*💸 SALDO FEE GAME*\n\n${detail}\n\n${sumText}\n= ${totalFee}`;
  vF8(out);
}
break;
    }
  } catch (e6) {
    console.error(e6);
  }
};