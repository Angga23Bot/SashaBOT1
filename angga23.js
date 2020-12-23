const { decryptMedia } = require('@open-wa/wa-decrypt')
const axios = require('axios')
const fs = require('fs-extra')
const moment = require('moment-timezone')
const getYouTubeID = require('get-youtube-id')
const os = require('os')
const get = require('got')
const speed = require('performance-now')
const color = require('./lib/color')
const fetch = require('node-fetch')
const { spawn, exec } = require('child_process')
const urlShortener = require('./lib/shortener')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const google = require('google-it')
const translatte = require('translatte')
const { stdout } = require('process')
const quotedd = require('./lib/quote')
const translate = require('translatte')
const { getStickerMaker } = require('./lib/ttp')
const Math_js = require('mathjs');
const imageToBase64 = require('image-to-base64')
const bent = require('bent')
const request = require('request')
const {
    RemoveBgResult,
    removeBackgroundFromImageBase64,
    removeBackgroundFromImageFile
} = require('remove.bg')


const { 
    downloader,
    liriklagu,
    quotemaker,
    randomNimek,
    sleep,
    jadwalTv,
    msgFilter, 
    processTime,
    instagram,
    nulis,
	sarahfs
    } = require('./lib/functions')

const { 
    help,
	intro,
	admincmd,
    ownercmd,
    nsfwcmd,
    kerangcmd,
    mediacmd,
    animecmd,
    othercmd,
    downloadcmd,
    praycmd,
    groupcmd,
	VIPcmd,
    bahasalist,
    sewa,
    snk, 
    info, 
    sumbang, 
    readme, 
    listChannel,
    commandArray
    } = require('./lib/help')

const { 
    uploadImages, 
    custom,
    stickerburn,
    stickerlight
    } = require('./lib/fetcher')

// LOAD FILE
const bad = JSON.parse(fs.readFileSync('./lib/database/bad.json'))
const badword = JSON.parse(fs.readFileSync('./lib/database/badword.json'))
const banned = JSON.parse(fs.readFileSync('./lib/database/banned.json'))
const nsfw_ = JSON.parse(fs.readFileSync('./lib/database/nsfwz.json'))
const NoLink = JSON.parse(fs.readFileSync('./lib/database/NoLink.json'))
const simi_ = JSON.parse(fs.readFileSync('./lib/database/Simsimi.json'))
const limit = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
const welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
const left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
const muted = JSON.parse(fs.readFileSync('./lib/database/muted.json'))
const setting = JSON.parse(fs.readFileSync('./lib/database/setting.json'))
const msgLimit = JSON.parse(fs.readFileSync('./lib/database/msgLimit.json'))
const adminNumber = JSON.parse(fs.readFileSync('./lib/database/admin.json'))
const VipUser = JSON.parse(fs.readFileSync('./lib/database/VipUser.json'))

let { 
    limitCount,
    memberLimit, 
    groupLimit,
    banChats,
    barbarkey,
    vhtearkey,
	prefix,
    restartState: isRestart,
    mtc: mtcState
    } = setting
	

let state = {
    status: () => {
        if(banChats){
            return 'Nonaktif'
        }else if(mtcState){
            return 'Nonaktif'
        }else if(!mtcState){
            return 'Aktif'
        }else{
            return 'Aktif'
        }
    }
}

moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = angga23 = async (angga23, message) => {
    try {
        const { 
            type, 
            id, 
            from, 
            t, 
            sender, 
            isGroupMsg, 
            chat, 
            chatId, 
            caption, 
            isMedia, 
            mimetype,
            quotedMsg, 
            quotedMsgObj, 
            author, 
            mentionedJidList 
            } = message

        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args =  commands.split(' ')
        
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
        const isQuotedFile = quotedMsg && quotedMsg.type === 'document'

        const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''

        function restartAwal(client){
            setting.restartState = false
            isRestart = false
            angga23.sendText(setting.restartId, 'Restart Succesfull!')
            setting.restartId = 'undefined'
            fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null,2));
        }
 
        const isMuted = (chatId) => {
          if(muted.includes(chatId)){
            return false
        }else{
            return true
            }
        }

        function banChat () {
            if(banChats == true) {
            return false
        }else{
            return true
            }
        }

        if (typeof Array.prototype.splice === 'undefined') {
            Array.prototype.splice = function (index, howmany, elemes) {
                howmany = typeof howmany === 'undefined' || this.length;
                var elems = Array.prototype.slice.call(arguments, 2), newArr = this.slice(0, index), last = this.slice(index + howmany);
                newArr = newArr.concat.apply(newArr, elems);
                newArr = newArr.concat.apply(newArr, last);
                return newArr;
            }
        }

        const apakah = [
            'Ya',
            'Tidak',
            'Coba Ulangi'
            ]

        const bisakah = [
            'Bisa',
            'Tidak Bisa',
            'Coba Ulangi'
            ]

        const kapankah = [
            '1 Minggu lagi',
            '1 Bulan lagi',
            '1 Tahun lagi'
            ]
			
		const balas = [
			`Nandayo ${pushname}?`,
			`Nani Daling?`,
			`Haik!`,
			`Areee...?`,
			`Arerereee...?`
			]

        const rate = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
            ]

        const mess = {
            wait: '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar',
            error: {
                St: `[❗] Kirim gambar dengan caption *${prefix}sticker* atau tag gambar yang sudah dikirim`,
                Ti: `[❗] Replay sticker dengan caption *${prefix}stickertoimg* atau tag sticker yang sudah dikirim`,
                Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[❗] Bot tidak bisa mengeluarkan Admin group!',
                Sp: '[❗] Bot tidak bisa mengeluarkan Admin',
                Ow: '[❗] Bot tidak bisa mengeluarkan Owner',
                Bk: '[❗] Bot tidak bisa memblockir Owner',
                Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[❗] Link yang anda kirim tidak valid!'
            }
        }

        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
		const tm = moment(t * 1000).add(30, 'days').calendar()
        const botNumber = await angga23.getHostNumber()
        const blockNumber = await angga23.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await angga23.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const serial = sender.id
		//const prefix = `${prefix}`
        const isCmd = command.startsWith(`${prefix}`)
		
        const isAdmin = adminNumber.includes(sender.id)
        const ownerNumber = '6281338888294@c.us'
        const isOwner = ownerNumber.includes(sender.id)
		const isBad = bad.includes(sender.id)
		const isVipUser = VipUser.includes(sender.id)
        
		
        const isWhite = (chatId) => adminNumber.includes(chatId) ? true : false
        const isWhiteList = (chatId) => {
            if(adminNumber.includes(sender.id)){
                if(muted.includes(chatId)) return false
                return true
            }else{
                return false
            }
        }
        
        const isBanned = banned.includes(sender.id)
        const isBlocked = blockNumber.includes(sender.id)
		const isBadWord = isGroupMsg ? badword.includes(chat.id) : false
		const isNoLink = isGroupMsg ? NoLink.includes(chat.id) : false
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const isSimi = isGroupMsg ? simi_.includes(chat.id) : false
		//const isWord = isBad.includes(sender.id)
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~@=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~@?&/=]*)/gi)
        const url = args.length !== 0 ? args[0] : ''

        const tutor = 'https://i.ibb.co/Hp1XGbL/a4dec92b8922.jpg'
        const errorurl = 'https://linkpicture.com/q/20201127_075249.png'
        const errorurl2 = 'https://linkpicture.com/q/20201127_075249.png'
        // FUNCTION
                function isMsgLimit(id){
                    if (isAdmin) {return false;}
                    let found = false;
                    for (let i of msgLimit){
                        if(i.id === id){
                            if (i.msg >= 12) {
                                found === true 
                                angga23.reply(from, '*[ANTI-SPAM]*\nMaaf, akun anda kami blok karena SPAM, dan tidak bisa di UNBLOK!', id)
                                angga23.contactBlock(id)
                                banned.push(id)
                                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                                return true;
                            }else if(i.msg >= 7){
                                found === true
                                angga23.reply(from, '*[ANTI-SPAM]*\nNomor anda terdeteksi spam!\nMohon tidak spam 5 pesan lagi atau nomor anda AUTO BLOK!', id)
                                return true
                            }else{
                                found === true
                                return false;
                            }   
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, msg:1};
                        msgLimit.push(obj);
                        fs.writeFileSync('./lib/database/msgLimit.json',JSON.stringify(msgLimit));
                        return false;
                    }  
                }
                function addMsgLimit(id){
                    if (isAdmin) {return;}
                    var found = false
                    Object.keys(msgLimit).forEach((i) => {
                        if(msgLimit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        msgLimit[found].msg += 1;
                        fs.writeFileSync('./lib/database/msgLimit.json',JSON.stringify(msgLimit));
                    }
                }
                function isLimit(id){
                    if (isAdmin) {return false;}
                    let found = false;
                    for (let i of limit){
                        if(i.id === id){
                            let limits = i.limit;
                            if (limits >= limitCount) {
                                found = true;
                                angga23.reply(from, 'Perintah BOT anda sudah mencapai batas, coba esok hari :)', id)
                                return true;
                            }else{
                                limit
                                found = true;
                                return false;
                            }
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, limit:1};
                        limit.push(obj);
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                        return false;
                    }  
                }
                function limitAdd (id) {
                    if (isAdmin) {return;}
                    var found = false;
                    Object.keys(limit).forEach((i) => {
                        if(limit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        limit[found].limit += 1;
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                    }
                }
        
                function monospace(string) {
                    return '```' + string + '```'
                }
                // END HELPER FUNCTION
					if (isGroupMsg && isNoLink && !isGroupAdmins && !isAdmin && !isOwner){
                    if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                        const check = await angga23.inviteInfo(chats);
                        if (!check) {
                            return
                        } else {
                            angga23.reply(from, `*「 GROUP LINK DETECTOR 」*\nKamu mengirimkan link grup chat, maaf kamu di kick dari grup :(`, id).then(() => {
                                angga23.removeParticipant(groupId, sender.id)
                            })
                        }
                    }
                }
                // MRHRTZ
						if (isGroupMsg && isBadWord) {
						if (chats.match("anjing") || chats.match("ngntd") || chats.match("gblk") || chats.match("bgst") || chats.match("tolol") || chats.match("kntl") || chats.match("kontol") || chats.match("memek") || chats.match("cok") || chats.match("mmk") || chats.match("ngentod") || chats.match("babi") || chats.match("monyet") || chats.match("ajg")) {
						if (!isBadWord) return angga23.reply(from, 'Fitur ANTI BADWORD belum Aktif Pak', id)
						if (!isGroupAdmins) {
                        return angga23.reply(from, `*「 ANTI BADWORD 」*\nKamu telah berkata KASAR!. Maaf kamu akan di kick dari grup 🙁`, id)
                        .then(() => angga23.removeParticipant(groupId, sender.id))
                        .then(() => {
                            angga23.sendText(from, `*「 ANTI BADWORD 」*\nJika kamu berkata KASAR!. kamu akan di kick dari grup 🙁`, id)
                        }).catch(() => angga23.sendText(from, `Untung Gua Bukan Admin, Kalo Jadi Admin Udah Aku Kick Tuh! 😑`))
                    } else {
                        return angga23.reply(from, "Tolong Jaga Ucapan Min 😇", id)
					}
						}
						}
						
						
												
                if(body === `${prefix}mute` && isMuted(chatId) == true){
                    if(isGroupMsg) {
                        if (!isAdmin) return angga23.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh admin Sasha!', id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        angga23.reply(from, `Bot telah di mute pada chat ini! ${prefix}unmute untuk unmute`,id)
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        reply(from, `Bot telah di mute pada chat ini! ${prefix}unmute untuk unmute!`, id)
                    }
                }
                if(body === `${prefix}unmute` && isMuted(chatId) == false){
                    if(isGroupMsg) {
                        if (!isAdmin) return angga23.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh admin Sasha!', id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        angga23.reply(from, 'Bot telah di unmute!', id)         
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        angga23.reply(from, 'Bot telah di unmute!', id)                   
                    }
                }
				
				if (chats.match("sasha") || chats.match("Sasha") || chats.match("SASHA")) {
					const bls = balas[Math.floor(Math.random() * (balas.length))]
					await angga23.reply(from, `*${bls}* \n\n`, id)
				}

                if (body === `${prefix}unbanchat`) {
                    if (!isOwner) return angga23.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh Owner Sasha!', id)
                    if(setting.banChats === false) return
                    setting.banChats = false
                    banChats = false
                    fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
                    angga23.reply('Global chat has been disable!')
                }

        if (isCmd && !isGroupMsg) {console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))}
        if (isCmd && isGroupMsg) {console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))}
        if (isMuted(chatId) && banChat() && !isBlocked && !isBanned || isOwner ) {
        switch(command) {

        case `${prefix}banchat`:
            if (setting.banChats === true) return
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Sasha!', id)
            setting.banChats = true
            banChats = true
            fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
            angga23.reply('Global chat has been enable!')
            break
		case `prefix`:
			angga23.reply(from, `*Sasha is Use ( ${prefix} ) Prefix!.* 
_Prefix adalah tanda di awal perintah._
_Contoh: ${prefix}menu_`, id)
			break
		case `${prefix}setto`:
			if (!isOwner && !isAdmin) return angga23.reply(from, 'Maaf, Fitur ini hanya untuk OWNER dan ADMIN Sasha!', id)
			if (args.length === 1) return angga23.reply(from, `*Kirim Perintah ${prefix}setto [prefix baru]*. 
Contoh: ${prefix}setto #`, id)
			const pf = body.slice(7)  
			setting.prefix = `${pf}`
			prefix = `${pf}`
			fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null,2))
			angga23.reply(from, `Change Prefix To ${pf} SUCCESS!`, id)
			break
        case `${prefix}unmute`:
            console.log(`Unmuted ${name}!`)
            await angga23.sendSeen(from)
            break
        case `${prefix}unbanchat`:
            console.log(`Banchat ${name}!`)
            await angga23.sendSeen(from)
            break
		case `${prefix}stoimg`:
		case 'stickertoimg':
            if (quotedMsg && quotedMsg.type == 'sticker') {
                const mediaData = await decryptMedia(quotedMsg)
                angga23.reply(from, '[WAIT] Sedang di proses⏳ silahkan tunggu!', id)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await angga23.sendFile(from, imageBase64, 'imagesticker.jpg', 'Success Convert Sticker to Image!', id)
            } else if (!quotedMsg) return angga23.reply(from, 'Mohon tag sticker yang ingin dijadikan gambar!', id)
            break
		case `${prefix}bukagc`:
		case `${prefix}open`:
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh AdminSasha!', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            angga23.setGroupToAdminsOnly(groupId, false)
            break
        case `${prefix}sticker`:
        case `${prefix}stiker`:
		case `${prefix}s`:
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await angga23.sendImageAsSticker(from, imageBase64)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await angga23.sendImageAsSticker(from, imageBase64)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await angga23.sendStickerfromUrl(from, url, { method: 'get' })
                        .catch(err => console.log('Caught exception: ', err))
                } else {
                    angga23.reply(from, mess.error.Iv, id)
                }
            } else {
                    angga23.reply(from, mess.error.St, id)
            }
            break
        case `${prefix}ttp`:
                if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
                try
                {
                    const string = body.toLowerCase().includes(`${prefix}ttp`) ? body.slice(5) : body.slice(5)
                    if(args)
                    {
                        if(quotedMsgObj == null)
                        {
                            const gasMake = await getStickerMaker(string)
                            if(gasMake.status == true)
                            {
                                try{
                                    await angga23.sendImageAsSticker(from, gasMake.base64)
                                }catch(err) {
                                    await angga23.reply(from, 'Gagal membuat.', id)
                                } 
                            }else{
                                await angga23.reply(from, gasMake.reason, id)
                            }
                        }else if(quotedMsgObj != null){
                            const gasMake = await getStickerMaker(quotedMsgObj.body)
                            if(gasMake.status == true)
                            {
                                try{
                                    await angga23.sendImageAsSticker(from, gasMake.base64)
                                }catch(err) {
                                    await angga23.reply(from, 'Gagal membuat.', id)
                                } 
                            }else{
                                await angga23.reply(from, gasMake.reason, id)
                            }
                        }
                       
                    }else{
                        await angga23.reply(from, 'Tidak boleh kosong.', id)
                    }
                }catch(error)
                {
                    console.log(error)
                }
            break;
        case `${prefix}ttg`:
            if (!isGroupMsg) return angga23.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (quotedMsgObj == null) {
                    if (args.length === 1) return angga23.reply(from, `Kirim perintah *${prefix}ttg [ Teks ]* , contoh *${prefix}ttg aku bukan boneka*`, id)
                        await angga23.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${body.slice(5)}&apikey=${vhtearkey}`)
                        limitAdd(serial)
                } else {
                    await angga23.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${quotedMsgObj}&apikey=${vhtearkey}`)
                    limitAdd(serial)
                }
            } catch(e) {
                console.log(e)
                angga23.reply(from, 'Maaf, Server sedang Error')
            }
            break
        case `${prefix}stickergif`:
        case `${prefix}stikergif`:
        case `${prefix}sgif`:
            if (isMedia) {
                if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
                    const mediaData = await decryptMedia(message, uaOverride)
                    angga23.reply(from, '[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!', id)
                    const filename = `./media/aswu.${mimetype.split('/')[1]}`
                    await fs.writeFileSync(filename, mediaData)
                    await exec(`gify ${filename} ./media/output.gif --fps=60 --scale=240:240`, async function (error, stdout, stderr) {
                        const gif = await fs.readFileSync('./media/output.gif', { encoding: "base64" })
                        await angga23.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
                    })
                } else (
                    angga23.reply(from, `[❗] Kirim video dengan caption *${prefix}stickerGif* max 10 sec!'`, id)
                )
            }
            break
        case `${prefix}stickerlightning`:
        case `${prefix}slightning`:
		case `${prefix}sl`:
             angga23.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const Slight = imgnye.result.imgUrl
                await angga23.sendStickerfromUrl(from, Slight)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const Slight = imgnye.result.imgUrl
                await angga23.sendStickerfromUrl(from, Slight)
            } else {
                await angga23.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan @stickerlightning`, id)
            }
            break
        case `${prefix}stickerfire`:
        case `${prefix}sfire`:
		case `${prefix}bakar`:
            angga23.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await angga23.sendStickerfromUrl(from, Sfire)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await angga23.sendStickerfromUrl(from, Sfire)
            } else {
                await angga23.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan @stickerfire`, id)
            }
            break
        case `${prefix}groupinfo`:
		case `${prefix}gi`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
            isMuted(chatId) == false
            var totalMem = chat.groupMetadata.participants.length
            var desc = chat.groupMetadata.desc
            var groupname = name
            var welgrp = welkom.includes(chat.id)
            var leftgrp = left.includes(chat.id)
			var nl = NoLink.includes(chat.id)
			var abw = badword.includes(chat.id)
            var ngrp = nsfw_.includes(chat.id)
            var simu = simi_.includes(chat.id)
            var grouppic = await angga23.getProfilePicFromServer(chat.id)
            if (grouppic == undefined) {
                 var pfp = errorurl
            } else {
                 var pfp = grouppic 
            }
            await angga23.sendFileFromUrl(from, pfp, 'group.png', `➸ *Name : ${groupname}* 
*➸ Members : ${totalMem}*
*➸ Welcome : ${welgrp}*
*➸ Left : ${leftgrp}*
*➸ NoLink : ${nl}*
*➸ Anti BadWord : ${abw}*
*➸ NSFW : ${ngrp}*
*➸ Simsimi : ${simu}*
*➸ Group Description* 
${desc}`)
            break
        case `${prefix}quoterandom` :
        case `${prefix}quote`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            angga23.sendText(from, quotedd())
            break
        case `${prefix}tts`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            try {
                if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@tts [ Bahasa ] [ Teks ]*, contoh *@tts id halo semua*')
                var dataBhs = args[1]      
                const ttsHZ = require('node-gtts')(dataBhs)
                var dataText = body.slice(8)
                if (dataText === '') return angga23.reply(from, 'Masukkan teksnya', id)
                if (dataText.length > 500) return client.reply(from, 'Teks terlalu panjang!', id)
                var dataBhs = body.slice(5, 7)
                ttsHZ.save('./media/tts.mp3', dataText, function () {
                angga23.sendPtt(from, './media/tts.mp3', id)
                })
            } catch (err){
                console.log(err)
                angga23.reply(from, bahasa_list, id)
            }
            break
        case `${prefix}koin`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const side = Math.floor(Math.random() * 2) + 1
            if (side == 1) {
              angga23.sendStickerfromUrl(from, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', { method: 'get' })
            } else {
              angga23.sendStickerfromUrl(from, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', { method: 'get' })
            }
            break
        case `${prefix}dadu`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const dice = Math.floor(Math.random() * 6) + 1
            await angga23.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' })
            break
        case `${prefix}kapankah`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const when = args.join(' ')
            const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
            if (!when) angga23.reply(from, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
            await angga23.sendText(from, `Pertanyaan: *${when}* \n\nJawaban: ${ans}`)
            break
        case `${prefix}nilai`:
        case `${prefix}rate`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const rating = args.join(' ')
            const awr = rate[Math.floor(Math.random() * (rate.length))]
            if (!rating) angga23.reply(from, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
            await angga23.sendText(from, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}`)
            break
        case `${prefix}apakah`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const nanya = args.join(' ')
            const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
            if (!nanya) angga23.reply(from, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
            await angga23.sendText(from, `Pertanyaan: *${nanya}* \n\nJawaban: ${jawab}`)
            break
         case `${prefix}bisakah`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const bsk = args.join(' ')
            const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
            if (!bsk) angga23.reply(from, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
            await angga23.sendText(from, `Pertanyaan: *${bsk}* \n\nJawaban: ${jbsk}`)
            break
		/*case 'sasha':
			const bls = balas[Math.floor(Math.random() * (balas.length))]
			await angga23.reply(from, `*${bls}* \n\n`, id)
			break*/
        case `${prefix}owner`:
        case `${prefix}creator`:
            angga23.sendContact(chatId, `6281338888294@c.us`)
            angga23.reply(from, 'Itu nomor Pacar ku, eh maksudnya Owner ku', id)
            break
        // ON OFF
        case `${prefix}nsfw`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return angga23.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                nsfw_.push(chat.id)
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(nsfw_))
                angga23.reply(from, 'NSFW berhasil di aktifkan di group ini! kirim perintah *@nsfwMenu* untuk mengetahui menu', id)
            } else if (args[1].toLowerCase() === 'disable') {
                nsfw_.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(nsfw_))
                angga23.reply(from, 'NSFW berhasil di nonaktifkan di group ini!', id)
            } else {
                angga23.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case `${prefix}simi`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isAdmin) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin Sasha!', id) // Hanya Admin yang bisa mengaktifkan
            if (args.length === 1) return angga23.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                simi_.push(chat.id)
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(simi_))
                angga23.reply(from, 'Simsimi berhasil di aktifkan di group ini! Kirim perintah *@ [teks]*\nContoh : *@ halo*', id)
            } else if (args[1].toLowerCase() === 'disable') {
                simi_.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(simi_))
                angga23.reply(from, 'Simsimi berhasil di nonaktifkan di group ini!', id)
            } else {
                angga23.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case `${prefix}group`:
            if (!isGroupMsg) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (args.length === 1) return angga23.reply(from, 'Pilih open atau close!', id)
            if (args[1].toLowerCase() === 'open') {
                angga23.setGroupToAdminsOnly(groupId, false)
                angga23.sendTextWithMentions(from, `Group telah dibuka oleh admin @${sender.id.replace('@c.us','')}\nSekarang *semua member* dapat mengirim pesan`)
            } else if (args[1].toLowerCase() === 'close') {
                angga23.setGroupToAdminsOnly(groupId, true)
                angga23.sendTextWithMentions(from, `Group telah ditutup oleh admin @${sender.id.replace('@c.us','')}\nSekarang *hanya admin* yang dapat mengirim pesan`)
            } else {
                angga23.reply(from, 'Pilih open atau disable close!', id)
            }
            break
        case `${prefix}left`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return angga23.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                left.push(chat.id)
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                angga23.reply(from, 'Fitur left berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                left.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                angga23.reply(from, 'Fitur left berhasil di nonaktifkan di group ini!', id)
            } else {
                angga23.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case `${prefix}welcome`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return angga23.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                welkom.push(chat.id)
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
                angga23.reply(from, 'Fitur welcome berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                welkom.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
                angga23.reply(from, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
            } else {
                angga23.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case `${prefix}antibadword`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return angga23.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                badword.push(chat.id)
                fs.writeFileSync('./lib/database/badword.json', JSON.stringify(badword))
                angga23.reply(from, 'Fitur Anti BadWord berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                badword.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/badword.json', JSON.stringify(badword))
                angga23.reply(from, 'Fitur Anti BadWord berhasil di nonaktifkan di group ini!', id)
            } else {
                angga23.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
		case `${prefix}nolink`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return angga23.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                NoLink.push(chat.id)
                fs.writeFileSync('./lib/database/NoLink.json', JSON.stringify(NoLink))
                angga23.reply(from, 'Fitur NoLink berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                NoLink.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/NoLink.json', JSON.stringify(NoLink))
                angga23.reply(from, 'Fitur NoLink berhasil di nonaktifkan di group ini!', id)
            } else {
                angga23.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        // ANIME //
        case `${prefix}otakudesu`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@otakudesu [query]*\nContoh : *@otakudesu darling in the franxx*', id)
            const animes = await axios.get('https://mhankbarbar.herokuapp.com/api/otakudesu?q=' + body.slice(7) + '&apiKey=' + barbarkey)
            if (animes.data.error) return angga23.reply(from, animes.data.error, id)
            const res_animes = `${animes.data.title}\n\n${animes.data.info}\n\n${animes.data.sinopsis}`
            angga23.sendFileFromUrl(from, animes.data.thumb, 'otakudesu.jpg', res_animes, id)
            break
        case `${prefix}kusonime`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@kusonime [query]*\nContoh : *@kusonime darling in the franxx*', id)
            const animeq = await axios.get('https://mhankbarbar.herokuapp.com/api/kuso?q=' + body.slice(7) + '&apiKey=' + barbarkey)
            if (animeq.data.error) return angga23.reply(from, animeq.data.error, id)
            const res_animeq = `${animeq.data.title}\n\n${animeq.data.info}\n\n${animeq.data.sinopsis}\n\n${animeq.data.link_dl}`
            angga23.sendFileFromUrl(from, animeq.data.thumb, 'kusonime.jpg', res_animeq, id)
            break
        case `${prefix}dewabatch`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@dewabatch [query]*\nContoh : *@dewabatch darling in the franxx*', id)
            const animek = await axios.get('https://mhankbarbar.herokuapp.com/api/dewabatch?q=' + body.slice(7) + '&apiKey=' + barbarkey)
            if (animek.data.error) return angga23.reply(from, animek.data.error, id)
            const res_animek = `${animek.data.result}\n\n${animek.data.sinopsis}`
            angga23.sendFileFromUrl(from, animek.data.thumb, 'dewabatch.jpg', res_animek, id)
            break
        case `${prefix}komiku`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@komiku [query]*\nContoh : *@komiku darling in the franxx*', id)
            const animep = await axios.get('https://mhankbarbar.herokuapp.com/api/komiku?q=' + body.slice(7) + '&apiKey=' + barbarkey)
            if (animep.data.error) return angga23.reply(from, animep.data.error, id)
            const res_animep = `${animep.data.info}\n\n${animep.data.sinopsis}\n\n${animep.data.link_dl}`
            angga23.sendFileFromUrl(from, animep.data.thumb, 'komiku.jpg', res_animep, id)
            break
        case `${prefix}pinterest`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@pinterest [query]*\nContoh : *@pinterest Sasha*', id)
            const ptrsq = body.slice(11)
            const ptrs = await axios.get('https://api.fdci.se/rep.php?gambar='+ptrsq)
            const b = JSON.parse(JSON.stringify(ptrs.data))
            const ptrs2 =  b[Math.floor(Math.random() * b.length)]
            const image = await bent("buffer")(ptrs2)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            angga23.sendImage(from, base64, 'ptrs.jpg', `*Pinterest*\n\n*Hasil Pencarian : ${ptrsq}*`)
            break
        case `${prefix}nhview`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@nhview [212121]*\nContoh : *@nhview 321421*', id)
            const nhsh = body.slice(11)
            const nhsh2 = await axios.get('https://mnazria.herokuapp.com/api/nhentai?code='+nhsh)
            for (let i = 0; i < nhsh2.length; i++) {
                await angga23.sendImage(from, nhsh2[i].data, 'thumbserc.jpg', '', id)
                }
            break
        case `${prefix}loli`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const loli = await axios.get(`https://api.vhtear.com/randomloli&apikey=${vhtearkey}`)
            const loly = loli.data.result
            angga23.sendFileFromUrl(from, loly.result, 'loli.jpeg', '*LOLI*', id)
            break
        case `${prefix}shota`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const imageToBase64 = require('image-to-base64')
            var shouta = ['shota anime','anime shota'];
            var shotaa = shouta[Math.floor(Math.random() * shouta.length)];
            var urlshot = "https://api.fdci.se/rep.php?gambar=" + shotaa;
            
            axios.get(urlshot)
            .then((result) => {
            var sht = JSON.parse(JSON.stringify(result.data));
            var shotaak =  sht[Math.floor(Math.random() * sht.length)];
            imageToBase64(shotaak)
            .then(
                (response) => {
            let img = 'data:image/jpeg;base64,'+response
            angga23.sendFile(from, img, "shota.jpg", `*SHOTA*`, id)
                    }) 
                .catch(
                    (error) => {
                        console.log(error);
                    })
            })
            break
        case `${prefix}waifu`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const waifu = await axios.get('https://mhankbarbar.herokuapp.com/api/waifu' + '?apiKey=' + barbarkey)
            angga23.sendFileFromUrl(from, waifu.data.image, 'Waifu.jpg', `➸ Name : ${waifu.data.name}\n➸ Description : ${waifu.data.desc}\n\n➸ Source : ${waifu.data.source}`, id)
            break
        case `${prefix}husbu`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const diti = fs.readFileSync('./lib/database/husbu.json')
            const ditiJsin = JSON.parse(diti)
            const rindIndix = Math.floor(Math.random() * ditiJsin.length)
            const rindKiy = ditiJsin[rindIndix]
            angga23.sendFileFromUrl(from, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
            break
        case `${prefix}randomnekonime`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const nekonime = await axios.get(`https://api.vhtear.com/randomnekonime&apikey=${vhtearkey}`)
            const nekon = nekonime.data
            if (nekon.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            angga23.sendFileFromUrl(from, nekon.result, `Nekonime${ext}`, 'Nekonime!', id)
            break
        case `${prefix}randomtrapnime`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return angga23.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const trapnime = await axios.get('https://angga23-api.herokuapp.com/api/nsfwtrap')
            const trapn = trapnime.data.result
            if (trapn.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            angga23.sendImage(from, trapn.result, `trapnime${ext}`, 'Trapnime!', id)
            break
        case `${prefix}randomhentai`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return angga23.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const hentai = await axios.get(`https://angga23-api.herokuapp.com/api/hentai`)
            const henta = hentai.data
            if (henta.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            angga23.sendImage(from, henta.result, `RandomHentai${ext}`, 'Random Hentai!', id)
            break
        case `${prefix}randomnsfwneko`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return angga23.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const nsfwneko = await axios.get('https://angga23-api.herokuapp.com/api/nsfwneko')
            const nsfwn = nsfwneko.data
            if (nsfwn.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            angga23.sendImage(from, nsfwn.result, `NsfwNeko${ext}`, 'NsfwNeko!', id)
            break
        case `${prefix}randomanime`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const ranime = await axios.get('https://api.computerfreaker.cf/v1/anime')
            const ranimen = ranime.data
            if (ranimen.url.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            angga23.sendFileFromUrl(from, ranime.url, `RandomAnime${ext}`, 'Random Anime!', id)
            break
        case `${prefix}nhder`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return angga23.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length >=2){
                const code = args[1]
                const url = 'https://nhder.herokuapp.com/download/nhentai/'+code+'/zip'
                const short = []
                const shortener = await urlShortener(url)
                url['short'] = shortener
                short.push(url)
                const caption = `*NEKOPOI DOWNLOADER*\n\nLink: ${shortener}`
                angga23.sendText(from, caption)
            } else {
                angga23.sendText(from, 'Maaf tolong masukan code nuclear')
            }
            break
        case `${prefix}wallanime` :
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const walnime = ['https://wallpaperaccess.com/full/395986.jpg','https://wallpaperaccess.com/full/21628.jpg','https://wallpaperaccess.com/full/21622.jpg','https://wallpaperaccess.com/full/21612.jpg','https://wallpaperaccess.com/full/21611.png','https://wallpaperaccess.com/full/21597.jpg','https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png','https://wallpaperaccess.com/full/21591.jpg','https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg','https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg','https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png','https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg','https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png','https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg','https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg','https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png','https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png','https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg','https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg','https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png','https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png','https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg','https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png','https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg','https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg','https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg','https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png','https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg','https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg','https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png','https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg','https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png','https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg','https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg','https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg','https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png','https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg','https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png','https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg','https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg','https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg','https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg','https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg','https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg','https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg','https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg','https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png','https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg','https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg','https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg','https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png','https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png','https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png','https://cdn.nekos.life/wallpaper/yO6ioREenLA.png','https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg','https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png','https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png','https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg','https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg','https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg','https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg','https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/32EAswpy3M8.png','https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png','https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg','https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png','https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg','https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png','https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png','https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg','https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg','https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png','https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png','https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg','https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg','https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg','https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png','https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg','https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png','https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg','https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png','https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg','https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg','https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg','https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg','https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg','https://cdn.nekos.life/wallpaper/9ru2luBo360.png','https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png','https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png','https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg','https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg','https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg','https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg','https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png','https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png','https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg','https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg','https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png','https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg','https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg','https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg','https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg','https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg','https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg','https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg','https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg','https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg','https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg','https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png','https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg','https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png','https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg','https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png','https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg','https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png','https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png','https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png','https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png','https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png','https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png','https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png','https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg','https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg','https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg','https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg','https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg','https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png','https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg','https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg','https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg','https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg','https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg','https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg','https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png','https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png','https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png','https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg','https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg','https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg','https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg','https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg','https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png','https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png','https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg','https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg','https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg','https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png','https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png','https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg','https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png','https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg','https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg','https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png','https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg','https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg','https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg','https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg','https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg','https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png','https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png','https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg','https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png','https://cdn.nekos.life/wallpaper/58C37kkq39Y.png','https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg','https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg','https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg','https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png','https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg','https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg','https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png','https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg','https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg','https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png','https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg','https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg','https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png','https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png','https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg','https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg','https://cdn.nekos.life/wallpaper/89MQq6KaggI.png','https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
            let walnimek = walnime[Math.floor(Math.random() * walnime.length)]
            angga23.sendFileFromUrl(from, walnimek, 'Nimek.jpg', '', id)
            break
        case `${prefix}quotesnime`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const skya = await axios.get('https://mhankbarbar.herokuapp.com/api/quotesnime/random')
            skya_ = skya.data
            angga23.reply(from, `➸ *Quotes* : ${skya_.quote}\n➸ *Character* : ${skya_.character}\n➸ *Anime* : ${skya_.anime}`, id)
            break
        case `${prefix}meme`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes')
            const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
            angga23.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
            break
        case `${prefix}nekopoi`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return angga23.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@nekopoi [linkNekopoi]*\nContoh : *@nekopoi https://nekopoi.care/tsunpuri-episode-1-subtitle-indonesia/*', id)
            try {
            angga23.reply(from, mess.wait, id)
            const nekipoi = await axios.get('https://mhankbarbar.herokuapp.com/api/nekopoi?url=' + body.slice(7) + '&apikey=' + vhtearkey)
            const nekop = nekipoi.data.result
            const nekop2 = `*Anime Ditemukan!*\n➸ Judul : ${nekop.judul}\n➸ Dilihat : ${nekop.dilihat}\n➸ Info : ${nekop.info}`
            const image = await bent("buffer")(nekop.thumbnail)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            angga23.sendImage(from, base64, judul, nekop2)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
             angga23.sendText(ownerNumber, 'Nekopoi Error : ' + err)
			}
            break
        case `${prefix}quoteanime`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
                        if(args[1]){
                            if(args[1] === 'anime'){
                                const anime = body.slice(13)
                                axios.get('https://animechanapi.xyz/api/quotes?anime='+anime).then(({ data }) => {
                                    let quote = data.data[0].quote 
                                    let char = data.data[0].character
                                    let anime = data.data[0].anime
                                    angga23.sendText(from, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)
                                }).catch(err => {
                                    angga23.sendText('Quote Char/Anime tidak ditemukan!')
                                })
                            }else{
                                const char = body.slice(12)
                                axios.get('https://animechanapi.xyz/api/quotes?char='+char).then(({ data }) => {
                                    let quote = data.data[0].quote 
                                    let char = data.data[0].character
                                    let anime = data.data[0].anime
                                    angga23.sendText(from, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)
                                }).catch(err => {
                                    angga23.sendText('Quote Char/Anime tidak ditemukan!')
                                })
                            }
                        }else{
                            axios.get('https://animechanapi.xyz/api/quotes/random').then(({ data }) => {
                                let penyanyi = data.result[0].penyanyi 
                                let judul = data.result[0].judul
                                let linkimg = data.result[0].linkImg
                                let lagu = data.result[0].linkMp3 
                                let size = data.result[0].filesize
                                let durasi = data.result[0].duration
                                angga23.sendText(from, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)                               
                            }).catch(err => {
                                console.log(err)
                            })
                        }
            break
        case `${prefix}malanime`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const keyword = message.body.replace(`${prefix}malanime`, '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/anime?q=${keyword}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
              return null
              }
            const { title, synopsis, episodes, url, rated, score, image_url } = parsed.results[0]
            const content = `*Anime Ditemukan!*
✨️ *Title:* ${title}
🎆️ *Episodes:* ${episodes}
💌️ *Rating:* ${rated}
❤️ *Score:* ${score}
💚️ *Synopsis:* ${synopsis}
🌐️ *URL*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            angga23.sendImage(from, base64, title, content)
           } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
           }
          break
        case `${prefix}malcharacter`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const keywords = message.body.replace(`${prefix}malcharacter`, '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/character?q=${keywords}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
              return null
              }
            const { name, alternative_names, url, image_url } = parsed.results[0]
            const contentt = `*Anime Ditemukan!*

✨️ *Name:* ${name}
💌️ *Alternative Names:* ${alternative_names}
🌐️ *URL*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            angga23.sendImage(from, base64, name, contentt)
           } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
           }
          break
        // PRAY //
        case `${prefix}jadwalshalat`:
        case `${prefix}jadwalsholat`:
            if (!isGroupMsg) return angga23.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return angga23.reply(from, `[❗] Kirim perintah *@jadwalShalat [ Daerah ]*\ncontoh : *@jadwalShalat Tangerang*\nUntuk list daerah kirim perintah *@listDaerah*`)
            const daerah = body.slice(14)
            const jadwalShalat = await axios.get(`https://api.vhtear.com/jadwalsholat?query=${daerah}&apiKey=${vhtearkey}`)
            if (jadwalShalat.data.error) return angga23.reply(from, jadwalShalat.data.error, id)
            const { Shubuh, Zduhur, Ashr, Magrib, Isya, kota } = await jadwalShalat.data
            arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            tgl = new Date().getDate()
            bln = new Date().getMonth()
            thn = new Date().getFullYear()
            const resultJadwal = `「 JADWAL SHALAT 」\n\nJadwal shalat di ${kota}, ${tgl}-${arrbulan[bln]}-${thn}\n\nSubuh : ${Shubuh}\nDzuhur : ${Zduhur}\nAshar : ${Ashr}\nMaghrib : ${Magrib}\nIsya : ${Isya}`
            await limitAdd(serial)
            break
        case `${prefix}quran`:
            if (!isGroupMsg) return angga23.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isVipUser) return angga23.reply(from, 'Fitur ini hanya dapat digunakan oleh User Vip Sasha!', id)
			if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return angga23.reply(from, `Kirim perintah Surah Quran kamu dengan cara ketik perintah :\n*@quran* [ Urutan Surat ]\nContoh :\n*@quran 1*`, id)
            const qura = `https://api.vhtear.com/quran?no=${args[1]}&apikey=${vhtearkey}`
            const quraan = await axios.get(qura)
            const quraann = quraan.data
            let hasqu = `*「 AL-QURAN 」*\n\n*Surah : ${quraann.result.surah}*\n*Quran* : ${quraann.result.quran}*`
            await angga23.reply(from, `${hasqu}`, id).catch((e) => angga23.reply(from, `*Terdapat kesalahan saat mencari surat ${args[1]}*`, id))
            await limitAdd(serial)
            break
        case `${prefix}listsurah`:
            if (!isGroupMsg) return angga23.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isVipUser) return angga23.reply(from, 'Fitur ini hanya dapat digunakan oleh User Vip Sasha!', id)
			try {
                axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                .then((response) => {
                    let hehex = '*「 DAFTAR SURAH 」*\n\n___________________________\n'
                    let nmr = 1
                    for (let i = 0; i < response.data.data.length; i++) {
                        hehex += nmr + '. ' +  monospace(response.data.data[i].name.transliteration.id.toLowerCase()) + '\n'
                        nmr++
                            }
                        hehex += `${prefix}__________________________`
                    angga23.reply(from, hehex, id)
                })
            } catch(err) {
                angga23.reply(from, err, id)
            }
            break
        case `${prefix}infosurah`:
            if (!isGroupMsg) return angga23.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isVipUser) return angga23.reply(from, 'Fitur ini hanya dapat digunakan oleh User Vip Sasha!', id)
			if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return angga23.reply(from, `Kirim perintah *@infosurah [ Nama Surah ]*\nContoh : *@infosurah al-fatihah*`, message.id)
                var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                var { data } = responseh.data
                var idx = data.findIndex(function(post, index) {
                if((post.name.transliteration.id.toLowerCase() == args[1].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[1].toLowerCase()))
                    return true;
                });
                try {
                    var pesan = "*「 INFORMASI SURAH 」*\n\n___________________________\n\n"
                    pesan = pesan + "➸ *Nama* : "+ data[idx].name.transliteration.id + "\n" + "➸ *Asma* : " +data[idx].name.short+"\n"+"➸ *Arti* : "+data[idx].name.translation.id+"\n"+"➸ *Jumlah ayat* : "+data[idx].numberOfVerses+"\n"+"➸ *Nomor surah* : "+data[idx].number+"\n"+"Jenis : "+data[idx].revelation.id+"\n"+"➸ *Keterangan* : "+data[idx].tafsir.id
                    pesan += '\n\n___________________________'
                    angga23.reply(from, pesan, message.id)
                    limitAdd(serial)
                }catch{
                    angga23.reply(from, 'Data tidak ditemukan, atau nama surah salah', id)
                }
            break
        case `${prefix}tafsir`:
            if (!isGroupMsg) return angga23.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return angga23.reply(from, `Kirim perintah *@tafsir [ Nama Surah ] [ Ayat ]*\nContoh : *@tafsir al-fatihah 2*`, message.id)
                var responsh = await axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                var {data} = responsh.data
                var idx = data.findIndex(function(post, index) {
                if((post.name.transliteration.id.toLowerCase() == args[1].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[1].toLowerCase()))
                    return true;
                });
            try{
                nmr = data[idx].number
                if(!isNaN(nmr)) {
                var responsih = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+args[2])
                    var {data} = responsih.data
                    pesan = ""
                    pesan = pesan + "*「 TAFSIR 」*\n\nTafsir Q.S. "+data.surah.name.transliteration.id+":"+args[2]+"\n\n"
                    pesan = pesan + data.text.arab + "\n\n"
                    pesan = pesan + "_" + data.translation.id + "_" + "\n\n" +data.tafsir.id.long
                    pesan += '\n\n___________________________'
                    angga23.reply(from, pesan, message.id)
                    limitAdd(serial)
                }
            }catch{
                angga23.reply(from, 'Data tidak ditemukan, mungkin nama surah/ayat salah', id)
            }
            break
        // MEDIA //
        case `${prefix}infogempa`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const bmkg = await axios.get('https://mhankbarbar.herokuapp.com/api/infogempa'+'?apiKey='+barbarkey)
            const { potensi, koordinat, lokasi, kedalaman, magnitude, waktu, map } = bmkg.data
            const hasil = `*${waktu}*\n📍 *Lokasi* : *${lokasi}*\n〽️ *Kedalaman* : *${kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${potensi}*\n📍 *Koordinat* : *${koordinat}*`
            angga23.sendFileFromUrl(from, map, 'shakemap.jpg', hasil, id)
            break
        case `${prefix}ssweb`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@ssweb [linkWeb]*\nContoh : *@ssweb https://neonime.vip*', id)
            const ssw = await axios.get('https://mhankbarbar.herokuapp.com/api/url2image?url=' + body.slice(7) + '&apiKey=' + barbarkey)
            const ssww = ssw.data
            if (ssww.error) return angga23.reply(from, ssww.error, id)
            const ssw2 = `Filesize: ${ssww.filesize}`
            angga23.sendFileFromUrl(from, ssww.result, 'ssweb.jpg', ssw2, id)
            break
        case `${prefix}shorturl`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@shorturl [linkWeb]*\nContoh : *@shorturl https://neonime.vip*', id)
            const surl = await axios.get('https://api.vhtear.com/shortener?link=' + body.slice(10) + '&apikey=' + vhtearkey)
            const surll = surl.data
            if (surll.error) return angga23.reply(from, ssww.error, id)
            const surl2 = `Link : ${surll.result.Url}\nShort URL : ${surll.result.Short}`
            angga23.sendText(from, surl2, id)
            break
        case `${prefix}cuaca`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@cuaca [tempat]*\nContoh : *@cuaca tangerang', id)
            const tempat = body.slice(7)
            const weather = await axios.get('https://mhankbarbar.herokuapp.com/api/cuaca?q='+ tempat +'&apiKey='+ barbarkey)
            const weatherr = weather.data
            if (weatherr.error) {
                angga23.reply(from, weatherr.error, id)
            } else {
                angga23.reply(from, `➸ Tempat : ${weatherr.result.tempat}\n\n➸ Angin : ${weatherr.result.angin}\n➸ Cuaca : ${weatherr.result.cuaca}\n➸ Deskripsi : ${weatherr.result.desk}\n➸ Kelembapan : ${weatherr.result.kelembapan}\n➸ Suhu : ${weatherr.result.suhu}\n➸ Udara : ${weatherr.result.udara}`, id)
            }
            break
        case `${prefix}covid`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const country = await slicedArgs.join(' ')
            console.log(country)
            const response2 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/' + country + '/')
            const { cases, todayCases, deaths, todayDeaths, active } = response2.data
                await angga23.sendText(from, '🌎️ Covid Info - ' + country + ' 🌍️\n\n✨️ Total Cases: ' + `${cases}` + '\n📆️ Today\'s Cases: ' + `${todayCases}` + '\n☣️ Total Deaths: ' + `${deaths}` + '\n☢️ Today\'s Deaths: ' + `${todayDeaths}` + '\n⛩️ Active Cases: ' + `${active}` + '.')
            break
        case `${prefix}spamcall`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return angga23.reply(from, 'Perintah ini hanya untuk Owner & Admin bot', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const spam = await slicedArgs.join(' ')
            console.log(spam)
            const call2 = await axios.get('https://mhankbarbar.herokuapp.com/api/spamcall?no=' + spam)
            const { logs } = call2.data
                await angga23.sendText(from, `Logs : ${logs}` + '.')
            break
        case `${prefix}ytmp4`:
            if (!isGroupMsg) return angga23.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return angga23.reply(from, `Kirim perintah *@ytmp4 [ Link Yt ]*, untuk contoh silahkan kirim perintah *@readme*`)
            let isLin = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLin) return angga23.reply(from, mess.error.Iv, id)
            try {
                angga23.reply(from, mess.wait, id)
                const ytvh = await fetch(`http://api.vhtear.com/ytdl?link=${args[1]}&apikey=${vhtearkey}`)
                if (!ytvh.ok) throw new Error(`Error Get Video : ${ytvh.statusText}`)
                const ytvh2 = await ytvh.json()
                 if (ytvh2.status == false) {
                    angga23.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if (Number(ytvh2.result.size.split(' MB')[0]) > 75.00) return angga23.reply(from, `Maaf durasi video sudah melebihi batas maksimal 30 MB!`, id)
                    const { title, UrlVideo, imgUrl, size } = await ytvh2.result
                    angga23.sendFileFromUrl(from, imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n➸ *Judul* : ${title}\n➸ *Filesize* : ${size}\n\n_*Untuk durasi lebih dari batas disajikan dalam bentuk link*._\n${UrlVideo}`, id)
                    await angga23.sendFileFromUrl(from, UrlVideo, `${title}.mp4`, '', id).catch(() => angga23.reply(from, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                angga23.sendText(ownerNumber, 'Error ytmp4 : '+ err)
                angga23.reply(from, mess.error.Yt4, id)
                console.log(err)
            }
            break
        case `${prefix}play`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
			if (!isVipUser) return angga23.reply(from, 'Fitur ini hanya dapat digunakan oleh User Vip Sasha!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @ceklimit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return angga23.reply(from, `Untuk mencari lagu dari youtube\n\nPenggunaan: @play judul lagu`, id)
            try {
                angga23.reply(from, mess.wait, id)
                const serplay = body.slice(6)
                const webplay = await fetch(`https://api.vhtear.com/ytmp3?query=${serplay}&apikey=${vhtearkey}`)
                if (!webplay.ok) throw new Error(`Error Get Video : ${webplay.statusText}`)
                const webplay2 = await webplay.json()
                 if (webplay2.status == false) {
                    angga23.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if (Number(webplay2.result.size.split(' MB')[0]) >= 30.00) return angga23.reply(from, 'Maaf durasi music sudah melebihi batas maksimal 10 MB!', id)
                    const { image, mp3, size, ext, title, duration } = await webplay2.result
                    const captplay = `*「 PLAY 」*\n\n➸ *Judul* : ${title}\n➸ *Durasi* : ${duration}\n➸ *Filesize* : ${size}\n➸ *Exp* : ${ext}\n\n_*Music Sedang Dikirim*_`
                    angga23.sendFileFromUrl(from, image, `thumb.jpg`, captplay, id)
                    await angga23.sendFileFromUrl(from, mp3, `${title}.mp3`, '', id).catch(() => angga23.reply(from, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                angga23.sendText(ownerNumber, 'Error Play : '+ err)
                angga23.reply(from, mess.error.Yt3, id)
            }
            break   
        case `${prefix}ytmp3`:
            if (!isGroupMsg) return angga23.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return angga23.reply(from, `Kirim perintah *@ytmp3 [ Link Yt ]*, untuk contoh silahkan kirim perintah *@readme*`, id)
            let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLinks) return angga23.reply(from, mess.error.Iv, id)
            try {
                angga23.reply(from, mess.wait, id)
                const vhtearyt3 = await fetch(`https://api.vhtear.com/ytdl?link=${args[1]}&apikey=${vhtearkey}`)
                if (!vhtearyt3.ok) throw new Error(`Error ytmp3 3 : ${vhtearyt3.statusText}`)
                const vhtearyt33 = await vhtearyt3.json()
                 if (vhtearyt33.status == false) {
                    angga23.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if(Number(vhtearyt33.result.size.split(' MB')[0]) >= 50.00) return angga23.sendFileFromUrl(from, vhtearyt33.result.imgUrl, `thumb.jpg`, `*「 YOUTUBE MP3 」*\n\n• *Judul* : ${vhtearyt33.result.title}\n• *Filesize* : ${vhtearyt33.result.size}\n\n_Maaf, Durasi audio melebihi 10 MB. Silahkan download audio melalui link dibawah_.\n${vhtearyt33.result.UrlMp3}`, id)
                    const { title, ext, size, UrlMp3, status, imgUrl } = await vhtearyt33.result
                    console.log(`VhTear Giliran ${ext}\n${size}\n${status}`)
                    const captions = `*「 YOUTUBE MP3 」*\n\n• *Judul* : ${title}\n• *Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                    angga23.sendFileFromUrl(from, imgUrl, `thumb.jpg`, captions, id)
                    //await angga23.sendFile(from, UrlMp3, `${title}.mp3`, '', id)
                    await angga23.sendFileFromUrl(from, UrlMp3, `${title}.mp3`, '', id).catch(() => angga23.reply(from, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                angga23.sendText(ownerNumber, 'Error ytmp3 : '+ err)
                angga23.reply(from, mess.error.Yt3, id)
            }
            break
        case `${prefix}google`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            angga23.reply(from, mess.wait, id)
            const googleQuery = body.slice(8)
            if(googleQuery == undefined || googleQuery == ' ') return angga23.reply(from, `*Hasil Pencarian : ${googleQuery}* tidak ditemukan`, id)
            google({ 'query': googleQuery }).then(results => {
            let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
            for (let i = 0; i < results.length; i++) {
                vars +=  `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
            }
                angga23.reply(from, vars, id);
            }).catch(e => {
                console.log(e)
                angga23.sendText(ownerNumber, 'Google Error : ' + e);
            })
            break
        case `${prefix}translate`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if(args[1] == undefined || args[2] == undefined) return
            if(args.length >= 2){
                var codelang = args[1]
                var text = body.slice(11+codelang.length);
                translatte(text, {to: codelang}).then(res => {
                    angga23.sendText(from,res.text);
                    limitAdd(serial)
                }).catch(err => {
                     angga23.sendText(from,`[ERROR] Teks tidak ada, atau kode bahasa ${codelang} tidak support\n~> *@bahasa* untuk melihat list kode bahasa`);
                });
            }
            break
        case `${prefix}nhentai`: // SEARCH NHENTAI
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            angga23.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281338888294', id)
          break
        case `${prefix}getnhentai`: // DOWNLOADER NHENTAI PDF FROM #NHENTAI
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            angga23.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281338888294', id)
          break
        case `{prefix}xvideos`: // SEARCH VIDEO FROM YOUTUBE
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            angga23.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281338888294', id)
            break
        case `${prefix}getxvideos`: // DOWNLOADER VIDEO FROM #VIDEO
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            angga23.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281338888294', id)
            break
        case `${prefix}video`: // SEARCH VIDEO FROM YOUTUBE
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            angga23.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281338888294', id)
            break
        case `${prefix}getvideo`: // DOWNLOADER VIDEO FROM #VIDEO
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            angga23.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281338888294', id)
            break
        case `${prefix}music`: // SEARCH MUSIC FROM YOUTUBE
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            angga23.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281338888294', id)
            break
        case `${prefix}getmusic`: // DOWNLOADER MUSIC FROM #MUSIC
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            angga23.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281338888294', id)
            break
        case `${prefix}youtubesearch`: // SEARCH YOUTUBE
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            angga23.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281338888294', id)
            break
        case `${prefix}shopee`: // SEARCH SHOPEE PRODUCT
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            angga23.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281338888294', id)
            break
        case `${prefix}playstore`: // SEARCH PLAYSTORE
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            angga23.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281338888294', id)
            break
        case `${prefix}animesearch`: // SEARCH ANIME
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            angga23.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281338888294', id)
			break
		case `${prefix}xnxx`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return angga23.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@xnxx [linkXnxx]*, untuk contoh silahkan kirim perintah *@readme*')
            if (!args[1].match(isUrl) && !args[1].includes('xnxx.com')) return angga23.reply(from, mess.error.Iv, id)
            try {
                angga23.reply(from, mess.wait, id)
                const resq = await axios.get('https://mhankbarbar.herokuapp.com/api/xnxx?url='+ args[1] +'&apiKey='+ barbarkey)
                const resp = resq.data
                 if (resp.error) {
                    angga23.reply(from, ytvv.error, id)
                } else {
                    if (Number(resp.result.size.split(' MB')[0]) > 20.00) return angga23.reply(from, 'Maaf durasi video sudah melebihi batas maksimal 20 menit!', id)
                    angga23.sendFileFromUrl(from, resp.result.thumb, 'thumb.jpg', `➸ *Judul* : ${resp.result.judul}\n➸ *Deskripsi* : ${resp.result.desc}\n➸ *Filesize* : ${resp.result.size}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
                    await angga23.sendFileFromUrl(from, resp.result.vid, `${resp.result.title}.mp4`, '', id)}
            } catch (err) {
                console.log(err)
                await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                angga23.sendText(ownerNumber, 'Xnxx Error : ' + err)
            }
            break
            break
        case `${prefix}ramalpasangan`:
		case `${prefix}ramal`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@ramalpasangan [kamu|pasangan]*\nContoh : *@ramalpasangan angga23|Sasha*', id)
            arg = body.trim().split('|')
            if (arg.length >= 2) {
            angga23.reply(from, mess.wait, id)
            const kamu = arg[0]
            const pacar = arg[1]
            const rpmn = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn2 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn3 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn4 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn5 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn6 = rate[Math.floor(Math.random() * (rate.length))]
            const rjh2 = `*Hasil Pengamatan!*\nPasangan dengan nama ${kamu} dan ${pacar}\n\n➸ Cinta : ${rpmn}\n➸ Jodoh : ${rpmn2}\n➸ Kemiripan : ${rpmn3}\n➸ Kesukaan : ${rpmn4}\n➸ Kesamaan : ${rpmn5}\n➸ Kebucinan ${rpmn6}`
            angga23.reply(from, rjh2, id)
            } else {
            await angga23.reply(from, 'Wrong Format!', id)
            }
            break
        case `${prefix}artinama`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@artinama [query]*\nContoh : *@artinama angga23*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/artinama?nama=' + body.slice(9) + '&apikey=' + vhtearkey)
            if (resp.data.error) return angga23.reply(from, resp.data.error, id)
            const anm2 = `➸ Artinama : ${resp.data.result.hasil}`
            angga23.reply(from, anm2, id)
            } catch (err) {
                console.error(err.message)
                await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                angga23.sendText(ownerNumber, 'Artinama Error : ' + err)
           }
            break
        case `${prefix}fb`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@fb [linkFb]*\nContoh : *@fb https://www.facebook.com/24609282673/posts/10158628585367674/*', id)
            try {
            angga23.reply(from, mess.wait, id)
            const resp = await axios.get('https://mhankbarbar.herokuapp.com/api/epbe?url=' + body.slice(4) + '&apiKey=' + barbarkey)
            const epbe2 = `*Video Ditemukan!*\n➸ Title : ${resp.data.title}\n➸ Filesize : ${resp.data.filesize}\n➸ Published : ${resp.data.published}`
            angga23.sendFileFromUrl(from, resp.data.result, `${resp.data.title}.mp4`, epbe2, id)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
             angga23.sendText(ownerNumber, 'Facebook Error : ' + err)
           }
            break
        case `${prefix}tiktok`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@tiktok [linkTiktok]*\nContoh : *@tiktok https://vt.tiktok.com/yqyjPX/*', id)
            try {
            angga23.reply(from, mess.wait, id)
            const resp = await axios.get('https://api.vhtear.com/tiktokdl?link=' + body.slice(8) + '&apikey=' + vhtearkey)
            const { dibuat, duration, title, desk, video, image  } = resp.data.result
            const tpk = `*Video Ditemukan!*

➸ Judul : ${title}
➸ Deskripsi : ${desk}
➸ Durasi : ${duration}
➸ Dibuat : ${dibuat}

Menunggu video...`
            
            const pictk = await bent("buffer")(image)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            angga23.sendImage(from, base64, title, tpk)
            angga23.sendFIle(from, video, `${title}.mp4`, '', id)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
             angga23.sendText(ownerNumber, 'Tiktok Error : ' + err)
           }
            break
        case `${prefix}wiki`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@wiki [query]*\nContoh : *@wiki asu*', id)
            const queryz_ = body.slice(6)
            const wiki = await axios.get(`https://mhankbarbar.herokuapp.com/api/wiki?q=${queryz_}&lang=id&apiKey=${barbarkey}`)

            if (wiki.data.error) {
                angga23.reply(from, wiki.data.error, id)
            } else {
                angga23.sendText(from, `➸ *Query* : ${queryz_}\n\n➸ *Result* : ${wiki.data.result}`, id)
            }
            break
        case `${prefix}kbbi`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@wiki [query]*\nContoh : *@wiki asu*', id)
            const kbbl = body.slice(6)
            const kbbl2 = await axios.get(`https://mnazria.herokuapp.com/api/kbbi?search=${kbbl}`)

            if (kbbl2.data.error) {
                angga23.reply(from, kbbl2.data.error, id)
            } else {
                angga23.sendText(from, `➸ *Query* : ${kbbl}\n\n➸ *Result* : ${kbbl2.data.result}`, id)
            }
            break
        case `${prefix}googleimage`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@googleimage [query]*\nContoh : *@googleimage Sasha*', id)
            try{
                angga23.reply(from, mess.wait, id)
                const gimgg = body.slice(13)
                const gamb = `https://api.vhtear.com/googleimg?query=${gimgg}&apikey=${vhtearkey}`
                const gimg = await axios.get(gamb)
                var gimg2 = Math.floor(Math.random() * gimg.data.result.result_search.length)
                console.log(gimg2)
                await angga23.sendFileFromUrl(from, gimg.data.result.result_search[gimg2], `gam.${gimg.data.result.result_search[gimg2]}`, `*Google Image*\n\n*Hasil Pencarian : ${gimgg}*`, id)
            } catch (err) {
                console.log(err); 
                angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Gambar tidak ditemukan')
                angga23.sendText(ownerNumber, 'Google Image Error : ' + err)
            }
          break
        case `${prefix}smule`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@smule [linkSmule]*\nContoh : *@smule https://www.smule.com/p/767512225_3062360163*', id)
            angga23.reply(from, mess.wait, id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const sml = await slicedArgs.join(' ')
            console.log(sml)
            try {
            const resp = await axios.get('https://api.vhtear.com/getsmule?link=' + sml + '&apikey=' + vhtearkey)
            const { Type, title, url, image } = resp.data.result
            const sml3 = `*Music Ditemukan!*

➸ *Judul:* ${title}
➸ *Type:* ${Type}`

            angga23.sendImage(from, image, `${title}.jpg`, sml3)
            angga23.sendFileFromUrl(from, url, `${title}.mp3`, sml3, id)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Music tidak ditemukan')
             angga23.sendText(ownerNumber, 'Smule Error : ' + err)
           }
          break
        case `${prefix}sandwriting`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return angga23.reply(from, 'Kirim perintah *@sandwriting [ Teks ]*\nContoh *@sandwriting Sasha Cantik*', id)
            const swrt = body.slice(13)
            try {
            const swrt2 = await axios.get('https://api.vhtear.com/sand_writing?text1=' + swrt + '&apikey=' + vhtearkey)
            const { imgUrl } = swrt2.data.result
            const swrt3 = `*「 SAND WRITING 」*

*Text : ${swrt}*`
            const pictk = await bent("buffer")(imgUrl)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            angga23.sendImage(from, base64, swrt3)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             angga23.sendText(ownerNumber, 'Sand Writing Error : ' + err)
           }
          break
        case `${prefix}resepmasakan`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return angga23.reply(from, 'Kirim perintah *@resepmasakan [optional]*\nContoh *@resepmasakan rawon*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const rmk = await slicedArgs.join(' ')
            console.log(rmk)
            try {
            const resp = await axios.get('https://api.vhtear.com/resepmasakan?query=' + rmk + '&apikey=' + vhtearkey)
            const { bahan, cara, image, title  } = resp.data.result
            const rmk3 = `*Resep Ditemukan!*
➸ *Judul:* ${title}
➸ *Bahan:* ${bahan}
➸ *Cara:* ${cara}`

            const pictk = await bent("buffer")(image)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            angga23.sendImage(from, base64, title, rmk3)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Resep tidak ditemukan')
             angga23.sendText(ownerNumber, 'Resepmasakan Error : ' + err)
           }
           break
        case `${prefix}twitterstalk`:
        case `${prefix}twtstalk`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return angga23.reply(from, 'Kirim perintah *@twtstalk @username*\nContoh *@twtstalk @miakhalifah*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const twstalk = await slicedArgs.join(' ')
            console.log(twstalk)
            try {
            const twstalk2 = await axios.get('https://mhankbarbar.herokuapp.com/api/twstalk?username=' + twstalk + '&apiKey=' + barbarkey)
            const { followers_count, full_name, name, profile_pic, status_count } = twstalk2.data
            const twstalk3 = `*User Ditemukan!*
➸ *Nama:* ${name}
➸ *Nama Panjang:* ${full_name}
➸ *Jumlah Pengikut:* ${followers_count}
➸ *Jumlah Postingan:* ${status_count}`

            const pictk = await bent("buffer")(profile_pic)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            angga23.sendImage(from, base64, name, twstalk3)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             angga23.sendText(ownerNumber, 'Twitter Error : ' + err)
           }
          break
        case `${prefix}igstalk`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return angga23.reply(from, 'Kirim perintah *@igstalk @username*\nContoh *@igstalk duar_amjay*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const istalk = await slicedArgs.join(' ')
            console.log(istalk)
            try {
            const istalk2 = await axios.get('https://api.vhtear.com/igprofile?query=' + istalk + '&apikey=' + vhtearkey)
            const { biography, follower, follow, post_count, full_name, username, picture, is_private } = istalk2.data.result
            const istalk3 = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Nama:* ${full_name}
➸ *Bio:* ${biography}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *Jumlah Postingan:* ${post_count}`

            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            angga23.sendImage(from, base64, username, istalk3)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             angga23.sendText(ownerNumber, 'Igstalk Error : ' + err)
           }
          break
        case `${prefix}tiktokstalk`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return angga23.reply(from, 'Kirim perintah *@tiktokstalk @username*\nContoh *@tiktokstalk @duar_amjay*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const tstalk = await slicedArgs.join(' ')
            console.log(tstalk)
            try {
            const tstalk2 = await axios.get('https://api.vhtear.com/tiktokprofile?query=' + tstalk + '&apikey=' + vhtearkey)
            const { username, bio, follow, follower, title, like_count, video_post, description, picture, url_account } = tstalk2.data.result
            const tiktod = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Judul:* ${title}
➸ *Bio:* ${bio}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *Jumlah Like*: ${like_count}
➸ *Jumlah Postingan:* ${video_post}
➸ *Deskripsi:* ${description}
➸ *Link:* ${url_account}`

            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            angga23.sendImage(from, base64, title, tiktod)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             angga23.sendText(ownerNumber, 'Error Tiktokstalk : '+ err)
           }
          break
        case `${prefix}smulestalk`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@smulestalk [@username]*\nContoh : *@smulestalk loli*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const sstalk = await slicedArgs.join(' ')
            console.log(sstalk)
            try {
            const sstalk2 = await axios.get('https://api.vhtear.com/smuleprofile?query=' + sstalk + '&apikey=' + vhtearkey)
            const { username, full_name, follower, follow, biography, is_vip, picture, recording } = sstalk2.data.result
            const smule = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Full Name:* ${title}
➸ *Biografi:* ${biography}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *VIP*: ${is_vip}
➸ *Total Rekaman:* ${recording}`

            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            angga23.sendImage(from, base64, title, smule)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             angga23.sendText(ownerNumber, 'Error Smulestalk : '+ err)
            }
          break
        case `${prefix}`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isSimi) return angga23.reply(from, 'command/Perintah Simi belum di aktifkan di group ini!', id)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@ [teks]*\nContoh : *@ halo*')
            const que = body.slice(2)
            const sigo = await axios.get(`http://simsumi.herokuapp.com/api?text=${que}&lang=id`)
            const sigot = sigo.data
            angga23.reply(from, sigot.success, id)
            console.log(sigot)
            break
        case `${prefix}ig`: 
        case `${prefix}instagram`:
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return angga23.reply(from, `Kirim perintah *#ig [ Link Instagram ]* untuk contoh silahkan kirim perintah *#readme*`)
            if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return angga23.reply(from, `Maaf, link yang kamu kirim tidak valid. [Invalid Link]`, id)
            await angga23.reply(from, mess.wait, id);
            instagram(args[1]).then(async(res) => {
                let username = res.owner_username;
                for (let i = 0; i < res.post.length; i++) {
                if (res.post[i].type == "image") {
                        await angga23.sendFileFromUrl(from, res.post[i].urlDownload, "ig.jpg", `*「 INSTAGRAM 」*\n\n➸ *Username* : ${username}\n➸ *Tipe* : Image/Jpg`, id);
                        limitAdd(serial)
                    } else if (res.post[i].type == "video") {
                        await angga23.sendFileFromUrl(from, res.post[i].urlDownload, "ig.mp4", `*「 INSTAGRAM 」*\n\n➸ *Username* : ${username}\n➸ *Tipe* : Video/MP4`);
                        limitAdd(serial)
                    }
                }
            }).catch((err) => {
                console.log(err);
                angga23.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break    
        case `${prefix}starmaker`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@starmaker [linkStarmaker]* untuk contoh silahkan kirim perintah *@readme*')
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const smkr = await slicedArgs.join(' ')
            console.log(smkr)
            try {
            const smkr2 = await axios.get('https://api.vhtear.com/starmakerdl?link=' + smkr + '&apikey=' + vhtearkey)
            const { image, desc, url, title } = smkr2.data.result
            const smkr3 = `*User Ditemukan!*

➸ *Judul:* ${title}
➸ *Deskripsi:* ${desc}`

            const pictk = await bent("buffer")(image)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            angga23.sendImage(from, base64, 'image.jpg', 'nihh mhank')
            angga23.sendFileFromUrl(from, url, `${title}.mp4`, '', id)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             angga23.sendText(ownerNumber, 'Error Starmaker : '+ err)
           }
          break
        case `${prefix}maps`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@maps [optional]*, Contoh : *@maps Jakarta*')
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const mapz = await slicedArgs.join(' ')
            console.log(mapz)
            try {
            const mapz2 = await axios.get('https://mnazria.herokuapp.com/api/maps?search=' + mapz)
            const { gambar } = mapz2.data
            const pictk = await bent("buffer")(gambar)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            angga23.sendImage(from, base64, 'maps.jpg', `*Hasil Maps : ${mapz}*`)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             angga23.sendText(ownerNumber, 'Error Maps : '+ err)
           }
          break
        case `${prefix}twitter`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@twitter [linkTwitter]* untuk contoh silahkan kirim perintah *@readme*')
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const twtdl = await slicedArgs.join(' ')
            console.log(twtdl)
            try {
            const twtdl2 = await axios.get('https://mhankbarbar.herokuapp.com/api/twit?url=' + twtdl + '&apiKey=' + barbarkey)
            const { filesize, quote, result, title } = twtdl2.data
            const twtdl3 = `*User Ditemukan!*

➸ *Judul:* ${title}
➸ *Deskripsi:* ${quote}
➸ *Filesize:* ${filesize}`

            angga23.sendFileFromUrl(from, result, `${title}.mp4`, twtdl3, id)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
           }
          break
        case `${prefix}joox`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@joox [optional]*\nContoh : *@joox Alan Walker*', id)
            angga23.reply(from, mess.wait, id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const music = await slicedArgs.join(' ')
            console.log(music)
            try {
            const music2 = await axios.get('https://api.vhtear.com/music?query=' + music + '&apikey=' + vhtearkey)
            const { penyanyi, judul, album, linkImg, linkMp3, filesize, ext, duration } = music2.data.result[0]
            const musik = `*User Ditemukan!*

➸ *Penyanyi:* ${penyanyi}
➸ *Judul:* ${judul}
➸ *Album:* ${album}
➸ *Ext:* ${ext}
➸ *Size:* ${filesize}
➸ *Durasi:* ${duration}`

            const pictk = await bent("buffer")(linkImg)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            angga23.sendImage(from, base64, judul, musik)
            angga23.sendFileFromUrl(from, linkMp3, `${judul}.mp3`, '', id)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             angga23.sendText(ownerNumber, 'Error Joox : '+ err)
           }
          break
        case `${prefix}checkip`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@checkip [ipaddress]*\nContoh : *@checkip 182.0.144.145*', id)
            angga23.reply(from, mess.wait, id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const cekip = await slicedArgs.join(' ')
            console.log(cekip)
            try {
            const cekip2 = await axios.get('https://mnazria.herokuapp.com/api/check?ip=' + cekip)
            const { city, continent_name, country_name, ip, latitude, location, longitude, region_name } = cekip2.data
            const cekip3 = `*User Ditemukan!*

➸ *Kota:* ${city}
➸ *Benua:* ${continent_name}
➸ *Negara:* ${country_name}
➸ *Ip Address:* ${ip}
➸ *Garis Lintang:* ${latitude}
➸ *Kode Telepon:* +${location.calling_code}
➸ *Ibu Kota:* +${location.capital}
➸ *Bahasa:* +${location.languages[0].name}
➸ *Garis Bujur:* ${longitude}
➸ *Wilayah:* +${region_name}`

            const pictk = await bent("buffer")(location.country_flag)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            angga23.sendImage(from, base64, city, cekip3)
            } catch (err) {
             console.error(err.message)
             await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             angga23.sendText(ownerNumber, 'Error Check IP : '+ err)
           }
          break
        case `${prefix}nhentai`:
        case `${prefix}nh`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return angga23.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (args.length === 2) {
                const nuklir = body.split(' ')[1]
                angga23.reply(from, mess.wait, id)
                const cek = await nhentai.exists(nuklir)
                if (cek === true)  {
                    try {
                        const api = new API()
                        const pic = await api.getBook(nuklir).then(book => {
                            return api.getImageURL(book.cover)
                        })
                        const dojin = await nhentai.getDoujin(nuklir)
                        const { title, details, link } = dojin
                        const { parodies, tags, artists, groups, languages, categories } = await details
                        var teks = `*Title* : ${title}\n\n*Parodies* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artists* : ${artists.join(', ')}\n\n*Groups* : ${groups.join(', ')}\n\n*Languages* : ${languages.join(', ')}\n\n*Categories* : ${categories}\n\n*Link* : ${link}`
                        exec('nhentai --id=' + nuklir + ` -P mantap.pdf -o ./hentong/${nuklir}.pdf --format `+ `${nuklir}.pdf`, (error, stdout, stderr) => {
                            angga23.sendFileFromUrl(from, pic, 'hentod.jpg', teks, id).then(() => 
                            angga23.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id)).catch(() => 
                            angga23.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id))
                            if (error) {
                                console.log('error : '+ error.message)
                                return
                            }
                            if (stderr) {
                                console.log('stderr : '+ stderr)
                                return
                            }
                            console.log('stdout : '+ stdout)
                            })
                    } catch (err) {
                        angga23.reply(from, '[❗] Terjadi kesalahan, mungkin kode nuklir salah', id)
                    }
                } else {
                    angga23.reply(from, '[❗] Kode nuklir Salah!')
                }
            } else {
                angga23.reply(from, '[ WRONG ] Kirim perintah *@nhentai [kode]* untuk contoh kirim perintah *@readme*')
            }
            break
        /*case `${prefix}brainly`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length >= 2){
                const BrainlySearch = require('./lib/brainly')
                let tanya = body.slice(9)
                let jum = Number(tanya.split('.')[1]) || 2
                if (jum > 10) return angga23.reply(from, 'Max 10!', id)
                if (Number(tanya[tanya.length-1])){
                    tanya
                }
                angga23.reply(from, `➸ *Pertanyaan* : ${tanya.split('.')[0]}\n\n➸ *Jumlah jawaban* : ${Number(jum)}`, id)
                await BrainlySearch(tanya.split('.')[0],Number(jum), function(res){
                    res.forEach(x=>{
                        if (x.jawaban.fotoJawaban.length == 0) {
                            angga23.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n`, id)
                        } else {
                            angga23.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* 〙: ${x.jawaban.judulJawaban}\n\n➸ *Link foto jawaban* : ${x.jawaban.fotoJawaban.join('\n')}`, id)
                        }
                    })
                })
            } else {
                angga23.reply(from, 'Usage :\n!brainly [pertanyaan] [.jumlah]\n\nEx : \n!brainly NKRI .2', id)
            }
            break*/
        case `${prefix}brainly`:
                if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik #limit Untuk Mengecek Kuota Limit Kamu`, id)
                if (args.length === 1) return angga23.reply(from, `Kirim perintah ${fix}brainly [queru]\nContoh : ${predix}brainly keajaiban dunia`, id)
                    try {
                    const resp = await axios.get('https://api.vhtear.com/branly?query=' + body.slice(10) + '&apikey=' + vhtearkey)
                    if (resp.data.error) return angga23.reply(from, resp.data.error, id)
                    const anm2 = `➸ Jawaban : ${resp.data.result.data}`
                        angga23.reply(from, anm2, id)
                        } catch (err) {
                        console.error(err.message)
                        await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔 Maaf, User tidak ditemukan')
                        angga23.sendText(ownerNumber, 'Brainly Error : ' + err)
                        await limitAdd(serial)
						}
                        break
		case `${prefix}math`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (args.length === 1) return angga23.reply(from, '[❗] Kirim perintah *@math [ Angka ]*\nContoh : @math 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /')
            const mtk = body.slice(6)
            if (typeof Math_js.evaluate(mtk) !== "number") {
            angga23.reply(from, `"${mtk}", bukan angka!\n[❗] Kirim perintah *@math [ Angka ]*\nContoh : @math 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`, id)
        } else {
            angga23.reply(from, `*「 MATH 」*\n\n*Kalkulator*\n${mtk} = ${Math_js.evaluate(mtk)}`, id)
        }
        break
        case `${prefix}wait`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                if (isMedia) {
                    var mediaData = await decryptMedia(message, uaOverride)
                } else {
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                }
                const fetch = require('node-fetch')
                const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                angga23.reply(from, 'Searching....', id)
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: imgBS4 }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                    if (resolt.docs && resolt.docs.length <= 0) {
                        angga23.reply(from, 'Maaf, saya tidak tau ini anime apa', id)
                    }
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                        teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
                    }
                    teks += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
                    teks += `➸ *Ecchi* : ${is_adult}\n`
                    teks += `➸ *Eps* : ${episode.toString()}\n`
                    teks += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                    var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                    angga23.sendFileFromUrl(from, video, 'nimek.mp4', teks, id).catch(() => {
                        angga23.reply(from, teks, id)
                    })
                })
                .catch(() => {
                    angga23.reply(from, 'Error !', id)
                })
            } else {
                angga23.sendFileFromUrl(from, tutor, 'Tutor.jpg', 'Neh contoh mhank!', id)
            }
            break
        case `${prefix}textmaker`:
                if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                await limitAdd(serial)
                arg = body.trim().split('|')
                angga23.reply(from, '[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!', id)
                if ((isMedia || isQuotedImage) && arg.length >= 2) {
                const top = arg[1]
                const bott = arg[2]
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const getUrl = await uploadImages(mediaData, false)
                const ImageBase64 = await custom(getUrl, top, bott)
                await angga23.sendFile(from, ImageBase64, 'image.png','neh...')
                } else {
                await angga23.reply(from, 'Wrong Format!', id)
                }
                break
        case `${prefix}quotemaker`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            arg = body.trim().split('|')
            if (arg.length >= 4) {
                angga23.reply(from, mess.wait, id)
                const quotes = arg[1]
                const author = arg[2]
                const theme = arg[3]
                await quotemaker(quotes, author, theme).then(amsu => {
                    angga23.sendFile(from, amsu, 'quotesmaker.jpg','neh...').catch(() => {
                       angga23.reply(from, mess.error.Qm, id)
                    })
                })
            } else {
                angga23.reply(from, 'Usage: \n@quotemaker |teks|watermark|theme\n\nEx :\n@quotemaker |ini contoh|bicit|random', id)
            }
            break
        case `${prefix}listchannel`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            angga23.reply(from, listChannel, id)
            break
        case `${prefix}jadwaltv`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@jadwalTv [channel]*', id)
            const query = body.slice(10).toLowerCase()
            const jadwal = await jadwalTv(query)
            angga23.reply(from, jadwal, id)
            break
        case `${prefix}jadwaltvnow`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const jadwalNow = await axios.get('https://api.haipbis.xyz/jadwaltvnow')
            angga23.reply(from, `Jam : ${jadwalNow.data.jam}\n\nJadwalTV : ${jadwalNow.data.jadwalTV}`, id)
            break
        case `${prefix}nulis`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *#nulis [teks]*, contoh *#nulis aku bukan boneka*', id)
            const ngettik = body.slice(7)
				await angga23.reply(from, 'Tunggu sebentar!', id)
                await angga23.sendFileFromUrl(from, `https://api.vhtear.com/write?text=${ngettik}&apikey=${vhtearkey}`, 'nulis.jpg', 'Tulisan jadi...', id)
                    .then(() => console.log('Success sending write image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await angga23.reply(from, 'Error!', id)
                    })
            break
                case `${prefix}inu`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            angga23.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Inu')
            break
        case `${prefix}qrcode`:
           if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
        if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
           if(!args.lenght >= 2) return
           let qrcodes = body.slice(8)
           await angga23.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qrcodes}`, 'gambar.png', 'Process sukses!')
           break
        case `${prefix}ptl`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const pptl = ["https://i.pinimg.com/564x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/236x/98/08/1c/98081c4dffde1c89c444db4dc1912d2d.jpg","https://i.pinimg.com/236x/a7/e2/fe/a7e2fee8b0abef9d9ecc8885557a4e91.jpg","https://i.pinimg.com/236x/ee/ae/76/eeae769648dfaa18cac66f1d0be8c160.jpg","https://i.pinimg.com/236x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/564x/78/7c/49/787c4924083a9424a900e8f1f4fdf05f.jpg","https://i.pinimg.com/236x/eb/05/dc/eb05dc1c306f69dd43b7cae7cbe03d27.jpg","https://i.pinimg.com/236x/d0/1b/40/d01b40691c68b84489f938b939a13871.jpg","https://i.pinimg.com/236x/31/f3/06/31f3065fa218856d7650e84b000d98ab.jpg","https://i.pinimg.com/236x/4a/e5/06/4ae5061a5c594d3fdf193544697ba081.jpg","https://i.pinimg.com/236x/56/45/dc/5645dc4a4a60ac5b2320ce63c8233d6a.jpg","https://i.pinimg.com/236x/7f/ad/82/7fad82eec0fa64a41728c9868a608e73.jpg","https://i.pinimg.com/236x/ce/f8/aa/cef8aa0c963170540a96406b6e54991c.jpg","https://i.pinimg.com/236x/77/02/34/77023447b040aef001b971e0defc73e3.jpg","https://i.pinimg.com/236x/4a/5c/38/4a5c38d39687f76004a097011ae44c7d.jpg","https://i.pinimg.com/236x/41/72/af/4172af2053e54ec6de5e221e884ab91b.jpg","https://i.pinimg.com/236x/26/63/ef/2663ef4d4ecfc935a6a2b51364f80c2b.jpg","https://i.pinimg.com/236x/2b/cb/48/2bcb487b6d398e8030814c7a6c5a641d.jpg","https://i.pinimg.com/236x/62/da/23/62da234d941080696428e6d4deec6d73.jpg","https://i.pinimg.com/236x/d4/f3/40/d4f340e614cc4f69bf9a31036e3d03c5.jpg","https://i.pinimg.com/236x/d4/97/dd/d497dd29ca202be46111f1d9e62ffa65.jpg","https://i.pinimg.com/564x/52/35/66/523566d43058e26bf23150ac064cfdaa.jpg","https://i.pinimg.com/236x/36/e5/27/36e52782f8d10e4f97ec4dbbc97b7e67.jpg","https://i.pinimg.com/236x/02/a0/33/02a033625cb51e0c878e6df2d8d00643.jpg","https://i.pinimg.com/236x/30/9b/04/309b04d4a498addc6e4dd9d9cdfa57a9.jpg","https://i.pinimg.com/236x/9e/1d/ef/9e1def3b7ce4084b7c64693f15b8bea9.jpg","https://i.pinimg.com/236x/e1/8f/a2/e18fa21af74c28e439f1eb4c60e5858a.jpg","https://i.pinimg.com/236x/22/d9/22/22d9220de8619001fe1b27a2211d477e.jpg","https://i.pinimg.com/236x/af/ac/4d/afac4d11679184f557d9294c2270552d.jpg","https://i.pinimg.com/564x/52/be/c9/52bec924b5bdc0d761cfb1160865b5a1.jpg","https://i.pinimg.com/236x/1a/5a/3c/1a5a3cffd0d936cd4969028668530a15.jpg"]
            let pep = pptl[Math.floor(Math.random() * pptl.length)]
            angga23.sendFileFromUrl(from, pep, 'pptl.jpg', 'Follow ig : https://www.instagram.com/ptl_repost untuk mendapatkan penyegar timeline lebih banyak', message.id)
            break
        case `${prefix}neko`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            angga23.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Neko ')
            break
        case `${prefix}pokemon`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            q7 = Math.floor(Math.random() * 890) + 1;
            angga23.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png',)
            break
        case `${prefix}quote`:
        case `${prefix}quotes`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const quotez2 = await axios.get('https://mhankbarbar.herokuapp.com/api/randomquotes')
            angga23.reply(from, `➸ *Quotes* : ${quotez2.data.quotes}\n➸ *Author* : ${quotez2.data.author}`, id)
            break
        case `${prefix}lirik`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length == 1) return angga23.reply(from, 'Kirim perintah *@lirik [optional]*, contoh *@lirik aku bukan boneka*', id)
            const lagu = body.slice(7)
            const lirik = await liriklagu(lagu)
            angga23.reply(from, lirik, id)
            break
        case `${prefix}chord`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *@chord [query]*, contoh *@chord aku bukan boneka*', id)
            const query__ = body.slice(7)
            const chord = await axios.get('https://mhankbarbar.herokuapp.com/api/chord?q='+ query__+'&apiKey='+ barbarkey)
            if (chord.data.error) return angga23.reply(from, chord.data.error, id)
            angga23.reply(from, chord.data.result, id)
            break
        case `${prefix}listdaerah`:
            if (!isGroupMsg) return angga23.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            const listDaerah = await axios.get('https://mhankbarbar.herokuapp.com/daerah')
            angga23.reply(from, listDaerah.data.result, id)
            break
        // ADMIN & OWNER
        case `${prefix}bc`:
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya untuk Owner Sasha!', id)
            if (quotedMsg && quotedMsg.type == 'image') {
            const mediaData = await decryptMedia(quotedMsg, uaOverride)
            const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
            let msg = body.slice(4)
            const chatz = await angga23.getAllChatIds()
            for (let ids of chatz) {
                var cvk = await angga23.getChatById(ids)
                if (!cvk.isReadOnly) 
                await angga23.sendFile(ids, `${imageBase64}`,'bc.jpg', `[ *Sasha BroadCast* ]\n\n${msg}`)
            }
            } else {
            let msg = body.slice(4)
            const chatz = await angga23.getAllChatIds()
            for (let ids of chatz) {
                var cvk = await angga23.getChatById(ids)
                if (!cvk.isReadOnly) 
                await angga23.sendText(ids, `[ *Sasha BroadCast* ]\n\n${msg}`)
            }
        }
            angga23.reply(from, 'Broadcast Success!', id)
            break
        case `${prefix}adminlist`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `➸ @${admon.replace(/@c.us/g, '')}\n` 
            }
            await sleep(2000)
            await angga23.sendTextWithMentions(from, mimin)
            break
        case `${prefix}ownergroup`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const Owner_ = chat.groupMetadata.owner
            await angga23.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
            break
        case `${prefix}otagall`: // FOR OWNER & ADMIN Sasha
        case `${prefix}omentionall`:
		case `${prefix}p`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isOwner, !isAdmin) return angga23.reply(from, 'Perintah ini hanya untuk Owner Sasha', id)
            const groupMek = await angga23.getGroupMembers(groupId)
            let heho = '╔══✪〘 Mention All 〙✪══\n'
            for (let i = 0; i < groupMek.length; i++) {
                heho += '╠➥'
                heho += ` @${groupMek[i].id.replace(/@c.us/g, '')}\n`
            }
            heho += '╚═〘 Sasha BOT 〙'
            await sleep(2000)
            await angga23.sendTextWithMentions(from, heho)
            break
        case `${prefix}tagall`: // FOR GROUP ADMINS
        case `${prefix}mentionall`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            const groupMem = await angga23.getGroupMembers(groupId)
            let hehe = '╔══✪〘 Mention All 〙✪══\n'
            for (let i = 0; i < groupMem.length; i++) {
                hehe += '╠➥'
                hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += '╚═〘 Sasha BOT 〙'
            await sleep(2000)
            await angga23.sendTextWithMentions(from, hehe)
            break
        case `${prefix}skickall`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya untuk Owner Sasha', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMem = await angga23.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (ownerNumber.includes(allMem[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await angga23.removeParticipant(groupId, allMem[i].id)
                }
            }
            angga23.reply(from, 'Success kick all member', id)
            break
        case `${prefix}okickall`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya untuk Admin Sasha', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMeq = await angga23.getGroupMembers(groupId)
            for (let i = 0; i < allMeq.length; i++) {
                if ((adminNumber, ownerNumber).includes(allMeq[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await angga23.removeParticipant(groupId, allMeq[i].id)
                }
            }
            angga23.reply(from, 'Succes kick all member', id)
            break
        case `${prefix}kickall`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const isGroupOwner = sender.id === chat.groupMetadata.owner
            if (!isGroupOwner) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMek = await angga23.getGroupMembers(groupId)
            for (let i = 0; i < allMek.length; i++) {
                if ((adminNumber, ownerNumber).includes(allMek[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await angga23.removeParticipant(groupId, allMek[i].id)
                }
            }
            angga23.reply(from, 'Success kick all member', id)
            break
        case `${prefix}leaveall`:
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya untuk Owner Sasha', id)
            const allChats = await angga23.getAllChatIds()
            const allGroups = await angga23.getAllGroups()
            for (let gclist of allGroups) {
                await angga23.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChats.length}`)
                await angga23.leaveGroup(gclist.contact.id)
            }
            angga23.reply(from, 'Succes leave all group!', id)
            break
        case `${prefix}clearall`:
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya untuk Owner Sasha', id)
            const allChatz = await angga23.getAllChats()
            for (let dchat of allChatz) {
                await angga23.deleteChat(dchat.id)
            }
            angga23.reply(from, 'Succes clear all chat!', id)
            break
        case `${prefix}oadd`:
            const orang = args[1]
            if (!isGroupMsg) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return angga23.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *@add* 628xxxxx', id)
            if (!isOwner, !isAdmin) return angga23.reply(from, 'Perintah ini hanya untuk Admin Sasha', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await angga23.addParticipant(from,`${orang}@c.us`)
            } catch {
                angga23.reply(from, mess.error.Ad, id)
            }
            break
        case `${prefix}add`:
            const orgh = body.slice(5)
            if (!isGroupMsg) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return angga23.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *@add* 628xxxxx', id)
            if (!isGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await angga23.addParticipant(from,`${orgh}@c.us`)
            } catch {
                angga23.reply(from, mess.error.Ad, id)
            }
            break
        case `${prefix}okick`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya untuk Owner Sasha', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return angga23.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *@okick* @tagmember', id)
            await angga23.sendText(from, `Perintah Owner diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber, ownerNumber).includes(mentionedJidList[i])) return angga23.reply(from, mess.error.Sp, id)
                await angga23.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case `${prefix}kick`:
            if (!isGroupMsg) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return angga23.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *@kick* @tagmember', id)
            await angga23.sendText(from, `Perintah diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber, groupAdmins).includes(mentionedJidList[i])) return angga23.reply(from, mess.error.Sp, id)
                await angga23.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case `${prefix}oleave`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return angga23.reply(from, 'Perintah ini hanya untuk Admin Sasha', id)
            await angga23.sendText(from,'SASHA DIPERINTAHKAN KELUAR OLEH OWNER!!').then(() => angga23.leaveGroup(groupId))
            break
        case `${prefix}leave`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isAdmin) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin Sasha', id)
            await angga23.sendText(from,'Sayonara').then(() => angga23.leaveGroup(groupId))
            break
        case `${prefix}opromote`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return angga23.reply(from, 'Perintah ini hanya untuk Admin Sasha', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return angga23.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *@promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return angga23.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return angga23.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await angga23.promoteParticipant(groupId, mentionedJidList[0])
            await angga23.sendTextWithMentions(from, `Perintah Owner diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            break
        case `${prefix}promote`:
            if (!isGroupMsg) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return angga23.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *@promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return angga23.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return angga23.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await angga23.promoteParticipant(groupId, mentionedJidList[0])
            await angga23.sendTextWithMentions(from, `Perintah diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            break
        case `${prefix}odemote`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return angga23.reply(from, 'Perintah ini hanya untuk Admin Sasha', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return angga23.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *@demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return angga23.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return angga23.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await angga23.demoteParticipant(groupId, mentionedJidList[0])
            await angga23.sendTextWithMentions(from, `Perintah Owner diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break
        case `${prefix}demote`:
            if (!isGroupMsg) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return angga23.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *@demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return angga23.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return angga23.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await angga23.demoteParticipant(groupId, mentionedJidList[0])
            await angga23.sendTextWithMentions(from, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break
        case `${prefix}join`:
            if (args.length === 1) return angga23.reply(from, 'Hanya Owner yang bisa memasukan Bot ke dalam Grup!', id)
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya untuk Owner Sasha', id)
            const link = body.slice(6)
            const tGr = await angga23.getAllGroups()
            const minMem = 1
            const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
            const check = await angga23.inviteInfo(link)
            if (!isLink) return angga23.reply(from, 'Ini link? 👊🤬', id)
            if (tGr.length > 256) return angga23.reply(from, 'Maaf jumlah group sudah maksimal!', id)
            if (check.size < minMem) return angga23.reply(from, 'Member group tidak melebihi 5, bot tidak bisa masuk', id)
            if (check.status === 200) {
                await angga23.joinGroupViaLink(link).then(() => angga23.reply(from, 'Bot akan segera masuk!'))
            } else {
                angga23.reply(from, 'Link group tidak valid!', id)
            }
            break
        case `${prefix}odelete`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (isOwner && !isAdmin) return angga23.reply(from, 'Perintah ini hanya untuk Admin Sasha', id)
            if (!quotedMsg) return angga23.reply(from, 'Salah!!, kirim perintah *@delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return angga23.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
            angga23.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case `${prefix}delete`:
            if (!isGroupMsg) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            //if (!isGroupAdmins) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!quotedMsg) return angga23.reply(from, 'Salah!!, kirim perintah *@delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return angga23.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
            angga23.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case `${prefix}getss`:
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya untuk Owner Sasha', id)            
            const sesPic = await angga23.getSnapshot()
            angga23.sendFile(from, sesPic, 'session.png', 'Nih SAYANG!', id)
            break
        case `${prefix}sashaadmin`:
            let admn = `This is list of Sasha Admin\nTotal : ${adminNumber.length}\n`
            for (let i of adminNumber) {
                admn += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await angga23.reply(from, admn, id)
            break
		case `${prefix}listvip`:
			let lv = `Ini adalah list User VIP Sasha\nTotal : ${VipUser.length}\n`
			for (let i of VipUser) {
				lv += `➸ ${i.replace(/@c.us/g,'')}\n`
			}
			await angga23.reply(from, lv, id)
			break
		case `${prefix}listbadword`:
			let lbw = `Ini adalah list BAD WORD\nTotal : ${bad.length}\n`
			for (let i of bad) {
				lbw += `➸ ${i.replace(bad)}\n`
			}
			await angga23.reply(from, lbw, id)
			break
        case `${prefix}limit`:
			if (!isAdmin) return angga23.reply(from, 'Jika ingin cek limit bilang ke Admin atau Owner Sasha ya Kak...', id)
            var found = false
            const limidat = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
                for (let lmt of limidat) {
                    if (lmt.id === mentionedJidList[0]) {
                        let limitCounts = limitCount - lmt.limit
                        if (limitCounts <= 0) return angga23.sendTextWithMentions(from, `Limit request @${mentionedJidList[0].replace('@c.us', '')} sudah habis\n\n_Note : Limit akan direset setiap jam 09:00!_`, id)
                        angga23.sendTextWithMentions(from, `Sisa limit request @${mentionedJidList[0].replace('@c.us', '')} tersisa : *${limitCounts}*\n\n_Note : Limit akan direset setiap jam 09:00!_`, id)
                        found = true
                    }
                }
                if (found === false) {
                    let obj = {
                        id: `${mentionedJidList[0]}`,
                        limit: 1
                    };
                    limit.push(obj);
                    fs.writeFileSync('./lib/database/limit.json', JSON.stringify(limit, 1));
                    angga23.sendTextWithMentions(from, `Sisa limit request @${mentionedJidList[0].replace('@c.us', '')} tersisa : *${limitCount}*\n\n_Note : Limit akan direset setiap jam 09:00!_`, id)
				}
		            break
		case `${prefix}addlimit`:
			if (!isAdmin) return angga23.reply(from, 'Maaf kak, hanya untuk Admin Sasha.', id)
			var found = false;
                    Object.keys(limit).forEach((i) => {
                        if(limit[i].id == mentionedJidList[0]){
                            found = i
                        }
                    })
                    if (found !== false) {
                        limit[found].limit -= args[1];
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                    }
						angga23.sendTextWithMentions(from, `menambahkan ${args[1]} limit ke @${mentionedJidList[0].replace('@c.us', '')}` )
					break
        case `${prefix}restart`: // WORK IF YOU RUN USING PM2
            if(isOwner){
                angga23.sendText(from, '*[WARN]* Restarting ...')
                setting.restartState = true
                setting.restartId = chatId
                var obj = []
                //fs.writeFileSync('./lib/database/setting.json', JSON.stringify(obj, null,2));
                fs.writeFileSync('./lib/database/limit.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/muted.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/msgLimit.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(obj));
                const spawn = require('child_process').exec;
                function os_func() {
                    this.execCommand = function (command) {
                        return new Promise((resolve, reject)=> {
                        spawn(command, (error, stdout, stderr) => {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(stdout)
                        });
                    })
                }}
                var oz = new os_func();
                oz.execCommand('pm2 restart index').then(res=> {
                }).catch(err=> {
                    console.log("os >>>", err);
                })
            }
            break
		case `${prefix}addbadword`:
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Sasha!', id)
			if (!isGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group', id)
			if (args.length == 1) return angga23.reply(from, `Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`,id)
                const bw = body.slice(12)
				bad.push(bw)
			fs.writeFileSync('./lib/database/bad.json', JSON.stringify(bad))
                angga23.reply(from, 'Success Menambahkan Bad Word!', id)
				break
		case `${prefix}delbadword`:
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Sasha!', id)
			if (!isGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group', id)
			if (args.length == 1) return angga23.reply(from, `Kirim perintah ${prefix}delbadword [kata kasar]. contoh ${prefix}delbadword bego`,id)
				let dbw = body.slice(12)
				bad.splice(dbw)
				fs.writeFileSync('./lib/database/bad.json', JSON.stringify(bad))
				angga23.reply(from, 'Success Menghapus BAD WORD!', id)
			break
		case `${prefix}addvip`:
			if (!isAdmin) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin Sasha', id)
            //if (!isOwner) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Sasha!', id)
				for (let i = 0; i < mentionedJidList.length; i++) {
				VipUser.push(mentionedJidList[i])
				fs.writeFileSync('./lib/database/VipUser.json', JSON.stringify(VipUser))
				angga23.sendTextWithMentions(from, `Success Menambahkan User VIP Sasha!\n╭──────「 *VIP👑* 」──────\n│+ *UserID* : @${mentionedJidList[0].replace('@c.us', '')}\n│+ *Status* : *ACTIVE*\n│+ *Since* : ${time}\n│+ *Expired* : ${tm}\n│ Thx for Upgrade to VIP🥰\n╰──────「 *SASHA* 」────`, id)
				}
            break
		case `${prefix}delvip`:
			if (!isAdmin) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin Sasha', id)
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Sasha!', id)
				let dv = VipUser.indexOf(mentionedJidList[0])
				VipUser.splice(dv, 1)
				fs.writeFileSync('./lib/database/VipUser.json', JSON.stringify(VipUser))
				angga23.reply(from, 'Success Menghapus User VIP Sasha!', id)
			break
		case `${prefix}addadmin`:
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Sasha!', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                adminNumber.push(mentionedJidList[i])
                fs.writeFileSync('./lib/database/admin.json', JSON.stringify(adminNumber))
                angga23.reply(from, 'Success Menambahkan Admin Sasha!', id)
				}
            break
        case `${prefix}deladmin`:
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Sasha!', id)
                let inq = adminNumber.indexOf(mentionedJidList[0])
                adminNumber.splice(inq, 1)
                fs.writeFileSync('./lib/database/admin.json', JSON.stringify(adminNumber))
                angga23.reply(from, 'Success Menghapus Admin Sasha!', id)
            break
        case `${prefix}block`:
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Sasha!', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                let unblock = `${mentionedJidList[i]}`
                await angga23.contactBlock(unblock).then((a)=>{
                    console.log(a)
                    angga23.reply(from, `Success block ${args[1]}!`, id)
                })
            }
            break
        case `${prefix}unblock`:
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Sasha!', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                let unblock = `${mentionedJidList[i]}`
                await angga23.contactUnblock(unblock).then((a)=>{
                    console.log(a)
                    angga23.reply(from, `Success unblok ${args[1]}!`, id)
                })
            } 
            break
        case `${prefix}ban`:
            if (!isAdmin) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin Sasha!', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                banned.push(mentionedJidList[i])
                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                angga23.reply(from, 'Succes ban target!',id)
            }
            break
        case `${prefix}unban`:
            if (!isAdmin) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin Sasha!', id)
                let inz = banned.indexOf(mentionedJidList[0])
                banned.splice(inz, 1)
                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                angga23.reply(from, 'Unbanned User!', id)
            break
        case `${prefix}listgroup`:
                angga23.getAllGroups().then((res) => {
                let berhitung1 = 1
                let gc = `*This is list of group* :\n`
                for (let i = 0; i < res.length; i++) {
                    gc += `\n═════════════════\n\n*No : ${i+1}*\n*Nama* : ${res[i].name}\n*Pesan Belum Dibaca* : ${res[i].unreadCount} chat\n*Tidak Spam* : ${res[i].notSpam}\n`
                }
                angga23.reply(from, gc, id)
            })
            break
        case `${prefix}listbanned`:
            let bened = `This is list of banned number\nTotal : ${banned.length}\n`
            for (let i of banned) {
                bened += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await angga23.reply(from, bened, id)
            break
        case `${prefix}listblock`:
            let hih = `This is list of blocked number\nTotal : ${blockNumber.length}\n`
            for (let i of blockNumber) {
                hih += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await angga23.reply(from, hih, id)
            break
        case `${prefix}ping`:
		case `${prefix}speed`:
		case `${prefix}stat`:
            const loadedMsg = await angga23.getAmountOfLoadedMessages()
            const chatIds = await angga23.getAllChatIds()
            const groups = await angga23.getAllGroups()
			const me = await angga23.getMe()
            const battery = await angga23.getBatteryLevel()
            const isCharging = await angga23.getIsPlugged()
            await angga23.reply(from, `*_Penggunaan RAM:_* _${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB_ / ${Math.round(require('os').totalmem / 1024 / 1024)}MB\n_*CPU:*_ _${os.cpus()[0].model}_\n\n_*Status :*_\n- _*${loadedMsg}*_ _Loaded Messages_\n- _*${groups.length}*_ _Group Chats_\n- _*${chatIds.length - groups.length}*_ _Personal Chats_\n- _*${chatIds.length}*_ _Total Chats_\n\n*Status HP Bot*\n${(`\n*Battery :* _${battery}%_ ${isCharging ? '@Charging..._' : '@No Charging!_'}\n${Object.keys(me.phone).map(key => `*${key}* : _${me.phone[key]}_`).join('\n')}`.slice(1, -1))}\n\n\n*Speed:* _Kenceng Lah!_`, id)
            break
        case `${prefix}bugreport`:
            if (args.length === 1) return angga23.reply(from, '[❗] Kirim perintah *@bugreport [teks]*\ncontoh : *@bugreport Permisi Owner, Ada bug pada command @otakudesu, Tolong diperbaiki*')
            const bug = body.slice(11)
            if(!bug) return
            if(isGroupMsg){
                angga23.sendText(ownerNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\nGroup : ${formattedTitle}\n\n${bug}`)
                angga23.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditSashapi.' ,id)
            }else{
                angga23.sendText(ownerNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\n\n${bug}`)
                angga23.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditSashapi.', id)
            }
            break
		case `${prefix}getpp`:
			if (!isGroupMsg) return angga23.reply(from, 'Hanya untuk di grup!.', id)
				var pik = await angga23.getProfilePicFromServer(mentionedJidList[0])
				await angga23.sendFileFromUrl(from, pik, 'pik.jpg', 'Nih Kak...', id)
				break
		case `${prefix}getsts`:
			if (!isGroupMsg) return angga23.reply(from, 'Hanya untuk di grup!.', id)
				var ssts = await angga23.getStatus(mentionedJidList[0])
				const { status } = ssts
				await angga23.sendTextWithMentions(from, `Cieee... Statusnya @${mentionedJidList[0].replace('@c.us', '')}.\n\n${status}\n\nYahahaha...`, id)			
				break
		case `${prefix}getprofile`:
	    case `${prefix}you`:
			if (!isAdmin) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh AdminSasha!', id)
			if (isBanned, isBlocked) return false
			if (isGroupMsg) {
            if (!quotedMsg) {
            for (let i = 0; i < mentionedJidList.length; i++) {
            var block = blockNumber.includes(mentionedJidList[i])
            var bend = banned.includes(mentionedJidList[i])
            var pic = await angga23.getProfilePicFromServer(mentionedJidList[i])
            var namae = mentionedJidList[i]
            var sts = await angga23.getStatus(mentionedJidList[i])
            var adm = groupAdmins.includes(mentionedJidList[i])
            var donate =  adminNumber.includes(mentionedJidList[i])
            const { status } = sts
            if (pic == undefined) {
                var pfp = errorurl 
            } else {
                var pfp = pic
            } 
            await angga23.sendFileFromUrl(from, pfp, 'pfp.jpg', `*PROFILE :* \n☛ *User: ${namae}* \n☛ *Info: ${status}* \n☛ *Block : ${block}* \n☛ *Banned : ${bend}* \n☛ *Admin Group: ${adm}* \n☛ *AdminSasha: ${donate}*`)
         } if (quotedMsg) {
         var qmid = quotedMsgObj.sender.id
         var block = blockNumber.includes(qmid)
         var bend = banned.includes(mentionedJidList[i])
         var pic = await angga23.getProfilePicFromServer(qmid)
         var namae = quotedMsgObj.sender.name
         var sts = await angga23.getStatus(qmid)
         var adm = isGroupAdmins
         var donate = isAdmin
         const { status } = sts
			if (pic == undefined) {
			var pfp = errorurl 
			} else {
			var pfp = pic
			} 
			await angga23.sendFileFromUrl(from, pfp, 'pfp.jpg', `*User Profile* ✨ \n\n➸ *Username: ${namae}*\n\n➸ *User Info: ${status}*\n\n*➸ Block : ${block}*\n\n*➸ Banned : ${bend}*\n\n➸ *Admin Group: ${adm}*\n\n➸ *AdminSasha: ${donate}*`)
			angga23.sendContact(from, serial)
		 }
        }
    }
        break
         case `${prefix}profile`:
		 case `${prefix}me`:
            if (isBanned, isBlocked) return false
            if (isGroupMsg) {
                if (!quotedMsg) {
                var block = blockNumber.includes(author)
                var bend = banned.includes(author)
                var pic = await angga23.getProfilePicFromServer(author)
                var namae = pushname
                var sts = await angga23.getStatus(author)
                var adm = isGroupAdmins
                var donate = isAdmin
                const { status } = sts
                if (pic == undefined) {
                    var pfp = errorurl 
                } else {
                    var pfp = pic
                } 
                await angga23.sendFileFromUrl(from, pfp, 'pfp.jpg', `*User Profile* ✨️ \n\n➸ *Username: ${namae}*\n\n➸ *User Info: ${status}*\n\n*➸ Block : ${block}*\n\n*➸ Banned : ${bend}*\n\n➸ *Admin Group: ${adm}*\n\n➸ *Admin Sasha: ${donate}*`)
             } else if (quotedMsg) {
             var qmid = quotedMsgObj.sender.id
             var block = blockNumber.includes(qmid)
             var bend = banned.includes(author)
             var pic = await angga23.getProfilePicFromServer(qmid)
             var namae = quotedMsgObj.sender.name
             var sts = await angga23.getStatus(qmid)
             var adm = isGroupAdmins
             var donate = isAdmin
             const { status } = sts
              if (pic == undefined) {
              var pfp = errorurl 
              } else {
              var pfp = pic
              } 
              await angga23.sendFileFromUrl(from, pfp, 'pfp.jpg', `*User Profile* ✨️ \n\n➸ *Username: ${namae}*\n\n➸ *User Info: ${status}*\n\n*➸ Block : ${block}*\n\n*➸ Banned : ${bend}*\n\n➸ *Admin Group: ${adm}*\n\n➸ *Admin Sasha: ${donate}*`)
             }
            }
            break
        // LIST MENU
		case `${prefix}git`:
			angga23.sendText(from, 'Spesial Thanks To:')
			angga23.sendContact(chatId, `6281338888294@c.us`)
			angga23.sendContact(chatId, `6281311850715@c.us`)
			angga23.sendContact(chatId, `628992490269@c.us`)
			angga23.sendLinkWithAutoPreview(from, `GITHUB: https://github.com/Angga23Bot/SashaBOT1.git`)
			break
        case `${prefix}menu`:
        case `${prefix}help`:
            angga23.reply(from, help, id)
            break
		case `${prefix}intro`:
		    angga23.sendText(from, intro)
            break
        case `${prefix}sashagroup`:
            angga23.reply(from, `Link Group Sasha : https://chat.whatsapp.com/EF1Gm9Uyu2oF1fb57HAHLJ Jangan Lupa Join Ya Kak ${pushname}`, id)
            break
		case `${prefix}vipmenu`:
			angga23.sendText(from, VIPcmd)
			break
        case `${prefix}groupmenu`:
            angga23.sendText(from, groupcmd)
            break
        case `${prefix}mediamenu`:
            angga23.sendText(from, mediacmd)
            break
        case `${prefix}animemenu`:
            angga23.sendText(from, animecmd)
            break
        case `${prefix}kerangmenu`:
            angga23.sendText(from, kerangcmd)
            break
        case `${prefix}downloadmenu`:
            angga23.sendText(from, downloadcmd)
            break
        case `${prefix}othermenu`:
            angga23.sendText(from, othercmd)
            break
        case `${prefix}iklan`:
            angga23.sendText(from, sewa)
            break
        case `${prefix}adminmenu`:
            if (!isAdmin) return angga23.reply(from, 'Perintah ini hanya untuk Admin Sasha', id)
            angga23.sendText(from, admincmd)
            break
        case `${prefix}ownermenu`:
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya untuk Owner Sasha', id)
            angga23.sendText(from, ownercmd)
            break
        case `${prefix}praymenu`:
            angga23.reply(from, praycmd)
            break
        case `${prefix}nsfwmenu`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return angga23.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            angga23.sendText(from, nsfwcmd)
            break
        // INFORMATION
        case `${prefix}donate`:
            angga23.sendText(from, sumbang)
            break
        case `${prefix}readme`:
            angga23.reply(from, readme, id)
            break
        case `${prefix}info`:
            angga23.sendText(from, info)
            break
        case `${prefix}bahasa`:
            angga23.sendText(from, bahasalist)
            break
        case `${prefix}snk`:
            angga23.reply(from, snk, id)
            break
			
		//	NEW CASE
		
		case `${prefix}stylewriting`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

            await limitAdd(serial)
            if (args.length === 1)  return angga23.reply(from, 'Kirim perintah *@sandwriting [ Teks ]*\nContoh *@sandwriting HARDIANTO GANS*', id)
            const swrt1 = body.slice(13)
            try {
            const swrt2 = await axios.get('https://api.vhtear.com/sand_writing?text1=' + swrt1 + '&apikey=' + vhtearkey)
            const { imgUrl } = swrt2.data.result
            const swrt3 = `*「 SAND WRITING 」*
   *Text : ${swrt1}*`
            const pictk = await bent("buffer")(imgUrl)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            angga23.sendImage(from, base64, swrt3)
          } catch (err) {
            console.error(err.message)
            await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔 Maaf, User tidak ditemukan')
            angga23.sendText(ownerNumber, 'Sand Writing Error : ' + err)
              }
            break
		case `${prefix}sarah`:
            if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return angga23.reply(from, 'Kirim perintah *_sarah [query]*\nContoh : *_sarah ZeroTwo*', id)
            const txtsarah = body.slice(7)
            const sapi = await sarahfs(txtsarah)
            await angga23.sendFile(from, sapi, 'ss.jpg', 'cekrek', id)
            .catch(() => {
                angga23.reply(from, 'Ada yang Error!', id)
            })
            break
		case `${prefix}slap`:
            arg = body.trim().split(' ')
            const jejiik = author.replace('@c.us', '')
            await angga23.sendGiphyAsSticker(from, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
            angga23.sendTextWithMentions(from, `${prefix}` + jejiik + ' *slapped* ' + arg[1])
            break
        case `${prefix}hug`:
                arg = body.trim().split(' ')
                const janjing = author.replace('@c.us', '')
                await angga23.sendGiphyAsSticker(from, 'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif')
                angga23.sendTextWithMentions(from, `${prefix}` + janjing + ' *peyuuuk* ' + arg[1])
                break
        case `${prefix}nye`:
                arg = body.trim().split('')
                const jancuk7 = author.replace('@c.us', '')
                await angga23.sendGiphyAsSticker(from, 'https://media.giphy.com/media/cute-baka-13LunYkkBppSBa/giphy.gif')
                angga23.sendTextWithMentions(from, `${prefix}` + jancuk7 +' *nye nye ' + arg[1])
                break
        case `${prefix}pat`:
                arg = body.trim().split(' ')
                const jartod = author.replace('@c.us', '')
                await angga23.sendGiphyAsSticker(from, 'https://media.giphy.com/media/Z7x24IHBcmV7W/giphy.gif')
                angga23.sendTextWithMentions(from, `${prefix}` + jartod + ' *👈 Si Mengelu-elus si👉* ' + arg[1])
                break
		case 'kiss':
			angga23.sendPtt(from,'./media/yamete.mp3', id)
			break
		case 'ohayou':
			angga23.sendPtt(from, './media/ohayou.mp3', id)
            angga23.reply(from, 'Ohayo daling', id)
            break
		case 'konichiwa':
			angga23.sendPtt(from, './media/konichiwa.mp3',id)
			break
		case 'p':
			angga23.sendPtt(from, './media/senpai.mp3', id)
			break
		case 'oyasumi':
			angga23.sendPtt(from, './media/Oyasumi.mp3', id)
			break
		case 'tarekses':
		case 'tariksis':
		case 'tarek ses':
		case 'tarik sis':
			angga23.sendPtt(from, './media/tarekses.mp3', id)
			break
		case 'sad':
		case 'Sad':
		case 'SAD':
			angga23.sendPtt(from, './media/sad.mp3', id)
			break
		case 'irii':
			angga23.sendPtt(from, './media/iri2.mp3', id)
			break
		case 'iri':
			angga23.sendPtt(from, './media/iri.mp3', id)
			break
		case `${prefix}tutupgc`:
		case `${prefix}close`:
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh AdminSasha!', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            angga23.setGroupToAdminsOnly(groupId, true)
            break
		case `${prefix}bukagc`:
		case `${prefix}open`:
            if (!isOwner) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh AdminSasha!', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            angga23.setGroupToAdminsOnly(groupId, false)
            break
		case `${prefix}setlink`:
			if(!isGroupMsg) return angga23.sendText(from, 'Maaf, Perintah ini hanya dapat digunakan didslam group!.', id)
			if(!isOwner) return angga23.sendTextWithMentions(from, `Maaf kak perintah ini hanya untuk Kak @${sender.id.replace('@c.us','')}!.`, id)
		    if(!isGroupAdmins) angga23.sendTextWithMentions(from, `Maaf kak perintah ini hanya bisa dilakukan oleh Admin Kak @${sender.id.replace('@c.us','')}!.`, id)
					await angga23.revokeGroupInviteLink(chat.id);
					angga23.sendText(from, 'Tautan undangan berhasil di tarik')
			break
		/*case `${prefix}setlink`:
			if(isGroupMsg){
			if(isOwner)
		    if(isAdmin)
			var wkk = `${from.split('-')[0]}@c.us`
			if(message.author == wkk) {
				try {
					await angga23.revokeGroupInviteLink(chat.id);
					angga23.sendText(from, 'Tautan undangan berhasil di tarik')
					} catch (e) {
						angga23.reply(from, 'Sepertinya bot belum menjadi admin', id)
					}
			} else {
					angga23.reply(from, 'Maaf. fitur ini hanya untuk owner grup', id)
			} else {
				angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam grup', id)
			}
		    break*/
		case `${prefix}setname`:
            if (!isGroupMsg) return angga23.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return angga23.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return angga23.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            const namagrup = body.slice(9)
            let sebelum = chat.groupMetadata.formattedName
            let halaman = global.page ? global.page : await angga23.getPage()
            await halaman.evaluate((chatId, subject) =>
            Store.WapQuery.changeSubject(chatId, subject),groupId, `${namagrup}`)
            angga23.sendTextWithMentions(from, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us','')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
            break
		case `${prefix}setpic`:
			    if (!isGroupMsg) return angga23.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return angga23.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return angga23.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await angga23.setGroupIcon(from, imageBase64)
                angga23.sendTextWithMentions(from, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await angga23.setGroupIcon(from, imageBase64)
                angga23.sendTextWithMentions(from, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
            } else {
                angga23.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #setgroupicon`, id)
            }
            break
		case `${prefix}setpp`:
			if (isMedia) {
				const mediaData = await decryptMedia(message)
				const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
				await angga23.setProfilePic(imageBase64)
				angga23.reply(from, 'Set Profile Pic SUCCESS!', id)
			} else if (quotedMsg && quotedMsg.type == 'image') {
				const mediaData = await decryptMedia(quotedMsg)
				const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
				await angga23.setProfilePic(imageBase64)
				angga23.reply(from, 'Set Profile Pic SUCCESS!', id)
			} else {
                angga23.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan ${prefix}setpp`, id)
            } 
            break
		case `${prefix}setdesk`:
			if(isGroupMsg) {
				var wkk = `${from.split('-')[0]}@c.us`
				if(message.author == wkk || message.author == '6281338888294@c.us') {
					try {
						const desk = body.slice(9)
						await angga23.setGroupDescription(from, `${desk}`)
					} catch {
						angga23.reply(from, 'Terjadi kesalahan, tidak dapat mengubah deskripsi grup', message)
					}
				}else{
					angga23.reply(from, 'Maaf, fitur ini hanya untuk owner grup', message)
				}
			}else{
				angga23.reply(from, 'Fitur ini hanya bisa di gunakan dalam grup', message)
			}
                    break
		case `${prefix}linkgroup`:
		case `${prefix}getlink`:
			if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
			if (!isBotGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const inviteLink = await angga23.getGroupInviteLink(groupId);
            angga23.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}*`)
   			break
		case `${prefix}blackpink`:
            if (!isGroupMsg) return angga23.sendText(from, 'Maaf kak, hanya untuk didalam grup', id)
            if (args.length === 1) return angga23.reply(from, `kirim perintah ${prefix}blackpink [text]. Contoh: *${prefix}blackpink Sasha*`, id)
			if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis.`, id)
			const black = body.slice(11)
            const pink = `https://api.vhtear.com/blackpinkicon?text=${black}&apikey=${vhtearkey}`
            if (pink.error) return angga23.reply(from, pink.error, id)
            angga23.reply(from, 'Tunggu sebentar!.', id)
            await angga23.sendFileFromUrl(from, pink, 'blackpink.jpg', 'Yahahaha EMBLEK EMPINK :v', id)
            await limitAdd(serial)
			break
		case `${prefix}graffity`:
			if (!isGroupMsg) return angga23.reply(from, `Maaf Kak, Ini fitur Grup!.`, id)
			if (!isVipUser) return angga23.reply(from, `Maaf ${pushname}, hanya untuk VIP User Sasha`, id)
			if (args.length === 1) return angga23.reply(from, `Ketik perintah ${prefix}graffity [text]. Contoh: ${prefix}graffity kamu `, id)
			const graffity = body.slice(9)
			const graffityz = await get.get('http://inyourdream.herokuapp.com/graffity?kata=' + graffity).json()
			angga23.sendFileFromUrl(from, graffityz, id)
			break
		case `${prefix}thunder`:
			if (!isGroupMsg) return angga23.reply(from, 'Perintah ini hanya dapat digunakan didalam Group', id)
			if (!isVipUser) return angga23.reply(from, 'Perintah ini hanya untuk User VIP👑 Sasha', id)
            if (args.length === 1)return angga23.reply(from, `Kirim perintah ${prefix}thunder [text].\nContoh: ${prefix}thunder Sasha`, id)
			if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis.`, id)
			const th = body.slice(9)
			const tu = `https://api.vhtear.com/thundertext?text=${th}&apikey=${vhtearkey}`
			angga23.reply(from, 'Tunggu sebentar!.', id)
			await angga23.sendFileFromUrl(from, tu, 'Thunder.jpg', 'Nih Kak...', id)
            await limitAdd(serial)
            break
		case `${prefix}nyimak`:
            if(!isGroupMsg) return angga23.reply(from, 'Hanya untuk di dalam group', id)
            if(!quotedMsg) return angga23.reply(from,'reply pesan bot')
            try{
                const reader = await angga23.getMessageReaders(quotedMsgObj.id)
                let list = ''
                for (let pembaca of reader){
                    list +=`➣ @${pembaca.id.replace(/@c.us/g,'')}\n`
                }
                angga23.sendTextWithMentions(from, `Ciee, Ngeread doang... Jawab boss!! Ini grup WA Boss!! bukan KORAN!!!.\n${list}`, id)
            } catch(err) {
                console.log(err)
                angga23.reply(from,'Maaf, Belum ada yang membaca pesan Sasha', id)
            }
            break
        case `${prefix}xxx`:
            if (!isVipUser) return angga23.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin, Owner, dan User VIP Sasha!`, id)
            if (!isNsfw) return angga23.reply(from, `command/Perintah NSFW belum di aktifkan di group ini!`, id)
            if (!isGroupMsg) return angga23.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return angga23.reply(from, `Kirim perintah *#xxx* [ Judul ]`)
            const querXXX = body.slice(9)
            angga23.reply(from, mess.wait, id)
            try {
                const resxxx = await fetch(`https://api.vhtear.com/xxxsearch?query=${encodeURIComponent(querXXX)}&apikey=${vhtearkey}`)
                if (!resxxx.ok) throw new Error(`unexpected response ${resxxx.statusText}`)
                const resxxx2 = await resxxx.json()
                const { data } = await resxxx2.result
                let berhitung = 1
                let xixixi = `*「 XVIDEOS 」*\n\n*Hasil Pencarian : ${querXXX}*\n\n─────────────────\n\nKetik #getxxx [angka] untuk mengambil ID, Contoh : #getxxx 2\n`
                for (let i = 0; i < data.length; i++) {
                    xixixi += `\n─────────────────\n\n*Urutan* : ${berhitung+i}\n*Title* : ${data[i].title}\n*Duration* : ${data[i].duration}\n*Perintah download* : *#getxxx ${data[i].url}*\n`
                }
                    xixixi += `\n\n`
                for (let ii = 0; ii < data.length; ii++) {
                    xixixi += `(#)${data[ii].url}`
                }
                await angga23.sendFileFromUrl(from, data[0].image, 'thumbxxx.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
                angga23.sendFileFromUrl(from, errorurl, 'error.png', '💔️ Maaf, XXX tidak ditemukan')
                angga23.sendText(ownerNumber, 'XXX Error : ' + err)
            }
            break
        case `${prefix}getxxx`:
            //if (!isAdmin) return angga23.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin Sasha!`, id)
            if (!isVipUser) return angga23.reply(from, `Perintah ini hanya untuk Owner, Admin, dan User VIP Sasha!.`, id)
			if (!isNsfw) return angga23.reply(from, `command/Perintah NSFW belum di aktifkan di group ini!`, id)
            if (!isGroupMsg) return angga23.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (quotedMsg && quotedMsg.type == 'image') {
                    if (args.length === 1) return angga23.reply(from, `Kirim perintah *#getxxx [ Id Download ]*, untuk contoh silahkan kirim perintah *#readme*`)
                    if (!Number(args[1])) return angga23.reply(from, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *#getxxx 1*`, id)
                    const datavideo = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                    const pilur = datavideo.split('(#)')
                    console.log(pilur[args[1]])
                    angga23.reply(from, mess.wait, id)
                    const getxxx = await fetch(`https://api.vhtear.com/xxxdownload?link=${pilur[args[1]]}&apikey=${vhtearkey}`)
                    if (!getxxx.ok) throw new Error(`Error XXX : ${getxxx.statusText}`)
                    const getxxx2 = await getxxx.json()
                     if (getxxx2.status == false) {
                        angga23.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        try{
                        const { title, urlVideo, response } = await getxxx2.result
                        console.log(`STATUS API : ${response}`)
                        let xixixi = `*「 XXX DOWNLOADER 」*\n\n${title}`
                        for (let i = 0; i < urlVideo.length; i++) {
                            xixixi += `\n─────────────────\n\n*Title* : ${urlVideo[i].title}\n*Default Quality* : ${urlVideo[i].defaultQuality}\n*Format* : ${urlVideo[i].format}\n*Quality* : ${urlVideo[i].quality}\n*Url Video* : ${urlVideo[i].videoUrl}\n\n`
                        }
                        const captions = `*「 XXX DOWNLOADER 」*\n\n*Title* : ${title}\n\n*Ext* : MP4\n\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`
                        angga23.sendFileFromUrl(from, `https://thumbs.dreamstime.com/b/xxx-neon-sign-dark-background-xxx-neon-sign-dark-background-vector-illustration-129829099.jpg`, `xxx.jpg`, xixixi, id)
                        // await angga23.sendFileFromUrl(from, result, `${title}.mp3`, `Music telah terkirim ${pushname}`, id).catch(() => angga23.reply(from, mess.error.Yt4, id))
                        await limitAdd(serial)
                        } catch (err){
                            console.log(err)
                        }
                    }    
                } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    angga23.reply(from, `*Salah tag! hanya tag pesan berisi data hasil dari penelusuran videp.*`, id)
                } else {
                    if (args.length === 1) return angga23.reply(from, `Kirim perintah *#getxvideos [ Id Download ]*, untuk contoh silahkan kirim perintah *#readme*`)
                    if (args[1] <= 25) return angga23.reply(from, `*Apabila ingin mengambil data video dengan nomor urutan, mohon tag pesan bot tentang pencarian video!*`,)
                    angga23.reply(from, mess.wait, id)
                    const getxxx = await fetch(`https://api.vhtear.com/xxxsearch?link=${pilur[args[1]]}&apikey=${vhtearkey}`)
                    if (!getxxx.ok) throw new Error(`Error XXX : ${getxxx.statusText}`)
                    const getxxx2 = await getxxx.json()
                     if (getxxx2.status == false) {
                        angga23.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        //if (Number(getxxx2.result.data.duration.split(':')[0]) > 5) return angga23.sendFileFromUrl(from, imgUrl, `thumb.jpg`, `*「 XXX DOWNLOADER 」*\n\n*Website* : XVideos\n\n*Ext* : MP4\n*Link* : ${shortvidxv2}\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`, id)
                        const { title, urlVideo, response } = await getxxx2.result
                        console.log(`STATUS API : ${response}`)
                        let xixixi = `*「 XXX DOWNLOADER 」*\n\n*Title* : ${title}`
                        for (let i = 0; i < urlVideo.length; i++) {
                            xixixi += `\n─────────────────\n\n*Default Quality* : ${urlVideo[i].defaultQuality}\n*Format* : ${urlVideo[i].format}\n*Quality* : ${urlVideo[i].quality}\n*Url Video* : ${urlVideo[i].videoUrl}\n\n`
                        }
                        const captions = `*「 XXX DOWNLOADER 」*\n\n*Title* : ${title}\n\n*Ext* : MP4\n\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`
                        angga23.sendFileFromUrl(from, `https://thumbs.dreamstime.com/b/xxx-neon-sign-dark-background-xxx-neon-sign-dark-background-vector-illustration-129829099.jpg`, `xxx.jpg`, xixixi, id)
                        // await angga23.sendFileFromUrl(from, result, `${title}.mp3`, `Music telah terkirim ${pushname}`, id).catch(() => angga23.reply(from, mess.error.Yt4, id))
                        await limitAdd(serial)
                   }
                }
            } catch (err) {
                angga23.sendText(ownerNumber, 'Error XVideos : '+ err)
                angga23.reply(from, `*Kesalahan! Pastikan id download sudah benar.*`, id)
                console.log(err)
            }
            break
        case `${prefix}xvideos`:
            if (!isVipUser) return angga23.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner, Admin, dan User VIP Sasha!`, id)
            if (!isNsfw) return angga23.reply(from, `command/Perintah NSFW belum di aktifkan di group ini!`, id)
            if (!isGroupMsg) return angga23.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return angga23.reply(from, `Kirim perintah *#xvideos* [ Lagu ]`)
            const querVID = body.slice(9)
            angga23.reply(from, mess.wait, id)
            try {
                const resvid = await fetch(`https://mnazria.herokuapp.com/api/porn?search=${encodeURIComponent(querVID)}`)
                if (!resvid.ok) throw new Error(`unexpected response ${resvid.statusText}`)
                const jsonserxvid = await resvid.json()
                const { result } = await jsonserxvid
                let berhitung = 1
                let xixixi = `*「 XVIDEOS 」*\n\n*Hasil Pencarian : ${querVID}*\n\n─────────────────\n\nKetik #getxvideos [angka] untuk mengambil ID, Contoh : #getxvideos 2\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n─────────────────\n\n*Urutan* : ${berhitung+i}\n*Title* : ${result[i].title}\n*Actors* : ${result[i].actors}\n*Durasi* : ${result[i].duration}\n*Perintah download* : *#getxvideos ${result[i].url}*\n`
                }
                    xixixi += `\n\n`
                for (let ii = 0; ii < result.length; ii++) {
                    xixixi += `(#)${result[ii].url}`
                }
                await angga23.sendFileFromUrl(from, result[0].image, 'thumbxvid.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
                angga23.sendFileFromUrl(from, errorurl, 'error.png', '💔️ Maaf, Xvideos tidak ditemukan')
                angga23.sendText(ownerNumber, 'Xvideos Error : ' + err)
            }
            break
        case `${prefix}getxvideos`:
            if (!isAdmin) return angga23.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin Sasha!`, id)
            if (!isNsfw) return angga23.reply(from, `command/Perintah NSFW belum di aktifkan di group ini!`, id)
            if (!isGroupMsg) return angga23.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (quotedMsg && quotedMsg.type == 'image') {
                    if (args.length === 1) return angga23.reply(from, `Kirim perintah *#getxvideos [ Id Download ]*, untuk contoh silahkan kirim perintah *#readme*`)
                    if (!Number(args[1])) return angga23.reply(from, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *#getxvideos 1*`, id)
                    const datavideo = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                    const pilur = datavideo.split('(#)')
                    console.log(pilur[args[1]])
                    angga23.reply(from, mess.wait, id)
                    const vidxvid = await fetch(`https://mnazria.herokuapp.com/api/porndownloadxvideos?url=${pilur[args[1]]}`)
                    if (!vidxvid.ok) throw new Error(`Error Get Video : ${vidxvid.statusText}`)
                    const vidxvideo = await vidxvid.json()
                     if (vidxvideo.status == false) {
                        angga23.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        try{
                        const { mp4 } = await vidxvideo
                        const shortvidxv = await urlShortener(mp4)
                        const captions = `*「 XVIDEOS DOWNLOADER 」*\n\n*Website* : XVideos\n*Ext* : MP3\n\n*Silahkan download file media sedang melalui link yang tersedia.*\n${shortvidxv}`
                        angga23.sendFileFromUrl(from, `https://sensorstechforum.com/wp-content/uploads/2019/07/xvideos-virus-image-sensorstechforum-com.jpg`, ``, captions, id)
                        // await angga23.sendFileFromUrl(from, result, `${title}.mp3`, `XVIDEOS BY angga23`, id).catch(() => angga23.reply(from, mess.error.Yt4, id))
                        await limitAdd(serial)
                        } catch (err){
                            console.log(err)
                        }
                    }    
                } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    angga23.reply(from, `*Salah tag! hanya tag pesan berisi data hasil dari penelusuran videp.*`, id)
                } else {
                    if (args.length === 1) return angga23.reply(from, `Kirim perintah *#getxvideos [ Id Download ]*, untuk contoh silahkan kirim perintah *#readme*`)
                    if (args[1] <= 25) return angga23.reply(from, `*Apabila ingin mengambil data video dengan nomor urutan, mohon tag pesan bot tentang pencarian videp!*`,)
                    angga23.reply(from, mess.wait, id)
                    const getvide = await get.get(`https://mnazria.herokuapp.com/api/porndownloadxvideos?url=${pilur[args[1]]}`).json
                    if (getvide.error) {
                        angga23.reply(from, getvide.error, id)
                    } else {
                        const { mp4 } = await mhankyt35
                        const shortvidxv2 = await urlShortener(mp4)
                        console.log(`CHANGE API BARBAR : ${ext}\n${filesize}\n${status}`)
                        const captions = `*「 XVIDEOS DOWNLOADER 」*\n\n*Website* : XVideos\n\n*Ext* : MP4\n*Link* : ${shortvidxv2}\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`
                        angga23.sendFileFromUrl(from, `https://sensorstechforum.com/wp-content/uploads/2019/07/xvideos-virus-image-sensorstechforum-com.jpg`, ``, captions, id)
                        // await angga23.sendFileFromUrl(from, result, `${title}.mp3`, `Music telah terkirim ${pushname}`, id).catch(() => angga23.reply(from, mess.error.Yt4, id))
                        await limitAdd(serial)
                   }
                }
            } catch (err) {
                angga23.sendText(ownerNumber, 'Error XVideos : '+ err)
                angga23.reply(from, `*Kesalahan! Pastikan id download sudah benar.*`, id)
                console.log(err)
            }
            break
		case `${prefix}motor`:
				if (!isGroupMsg) return angga23.sendText(from, Maaf, 'Hanya dalam Grup!', id)
				if (!isVipUser) return angga23.reply(from, 'Maaf, Hanya untuk VIP User Sasha!', id)
                if (isLimit(serial)) return angga23.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                //if (isReg(obj)) return
                //if (cekumur(cekage)) return
				
                await limitAdd(serial)
                const mtr = body.slice(7)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/infomotor?merk=${mtr}&apikey=${vhtearkey}`)
                    if (resp.data.error) return angga23.reply(from, resp.data.error, id)
                    const kbbuaww = `➸ *Title* : ${resp.data.result.title}\n➸ *Harga* : ${resp.data.result.harga}\n➸ *Spesifikasi* : ${resp.data.result.spesifikasi}\n➸ *Kelebihan* : ${resp.data.result.kelebihan}\n➸ *Kekurangan* : ${resp.data.result.kekurangan}`
                    angga23.sendFileFromUrl(from, resp.data.result.image, 'gsm.jpg', kbbuaww, id)
                } catch (err) {
                    console.error(err.message)
                    await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, tidak ditemukan')
                    angga23.sendText(ownerNumber, 'Motor Error : ' + err)
                }
                break
        case `${prefix}hp`:
				if (!isGroupMsg) return angga23.sendText(from, Maaf, 'Hanya dalam Grup!', id)
				if (!isVipUser) return angga23.reply(from, 'Maaf, Hanya untuk VIP User Sasha!', id)
                //if (isReg(obj)) return
                //if (cekumur(cekage)) return
                if (isLimit(serial)) return angga23.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                const hpnya = body.slice(3)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/gsmarena?query=${hpnya}&apikey=${vhtearkey}`)
                    if (resp.data.error) return angga23.reply(from, resp.data.error, id)
                    const kbbuaww = `➸ ${resp.data.result.spec}`
                    angga23.sendFileFromUrl(from, resp.data.result.image, 'gsm.jpg', kbbuaww, id)
                } catch (err) {
                    console.error(err.message)
                    await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, tidak ditemukan')
                    angga23.sendText(ownerNumber, 'Spek Error : ' + err)
                }
                break
		case `${prefix}edotensei`:
			if (!isGroupMsg) return angga23.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return angga23.reply(from, 'Perintah ini hanya bisa di gunakan ketika menjadi admin!', id)	
			if (mentionedJidList.length === 0) return angga23.reply(from, `Untuk menggunakan Perintah ini, kirim perintah *${prefix}okick* @tagmember`, id)
            //const org = args[1]
			await angga23.sendText(from, `Siap kak, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber, ownerNumber).includes(mentionedJidList[i])) return angga23.reply(from, mess.error.Sp, id)
                await angga23.removeParticipant(groupId, mentionedJidList[i])
                await sleep(10000)
				await angga23.addParticipant(from, mentionedJidList[i])
            /*} catch {
                angga23.reply(from, mess.error.Ad, id)*/
            }
			break
        /*case `${prefix}mobil`:
				if (!isGroupMsg) return angga23.sendText(from, Maaf, 'Hanya dalam Grup!', id)
				if (!isVipUser) return angga23.reply(from, 'Maaf, Hanya untuk VIP User Sasha!', id)
                if (isLimit(serial)) return angga23.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                //if (isReg(obj)) return
                //if (cekumur(cekage)) return
				
                await limitAdd(serial)
                const mbl = body.slice(7)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/infomobil?merk=${mbl}&apikey=${vhtearkey}`)
                    if (resp.data.error) return angga23.reply(from, resp.data.error, id)
                    const kbbuaww = `➸ *Title* : ${resp.data.result.title}\n➸ *Harga* : ${resp.data.result.harga}\n➸ *Spesifikasi* : ${resp.data.result.spesifikasi}\n➸ *Kelebihan* : ${resp.data.result.kelebihan}\n➸ *Kekurangan* : ${resp.data.result.kekurangan}`
                    angga23.sendFileFromUrl(from, resp.data.result.image, 'gsm.jpg', kbbuaww, id)
                } catch (err) {
                    console.error(err.message)
                    await angga23.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, tidak ditemukan')
                    angga23.sendText(ownerNumber, 'Mobil Error : ' + err)
                }
                break
		/*case `${prefix}pornhub`: 
			if (!isGroupMsg) return angga23.reply(from, `Maaf, Hanya untuk didalam Grup!.`, id)
			const argy = body.trim(' ').split()
			const namaph1 = argy[1]
			const namaph2 = argy[2]
				const puppeteer = require('puppeteer')
			try {
				(async () => {
			const browser = await puppeteer.launch({
			headless: false,
			});
			const page = await browser.newPage();
			await page
			.goto("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", {
				waitUntil: "networkidle2"
			})
				.then(async () => {
				await page.type("#text-0", namaph1); //BUAT NAMA KE 1
				await page.type("#text-1", nama2); //BUAT NAMA KE 2
				await page.click("#submit");
				await new Promise(resolve => setTimeout(resolve, 3000));
				const element = await page.$(
					'div[class="btn-group"] > a'
					);
				const text = await (await element.getProperty("href")).jsonValue();
				const urlmp4 = ({
					url: text
				})
				angga23.sendFileFromUrl(from, text, id)
				browser.close();
 
			})
			.catch((err => {
				console.log(err)
				client.reply(from, 'error', id)
			}))
			})();
			} catch (error) {
			console.log('error bang')
			client.reply(from, 'error', id)
			}
			break
		case `${prefix}snobg`:
			if (!isVipUser) return angga23.reply(from, `Maaf ${pushname}, Hanya untuk VIP User Sasha!.`, id)
	    if (isMedia && type == 'image' && !quotedMsg && !quotedMsg == 'images') {
                try {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    const base64img = imageBase64
                    const filename = "./media/img/noBg.png";
                    //console.log(base64img)
                    const outFile = './media/images/noBg.png'
                    const result = await removeBackgroundFromImageBase64({
                        base64img,
                        apiKey: 'BVS8kEvc8NkMYx1JBETzE4QT',
                        size: 'auto',
                        type: 'auto',
                        outFile
                    })
                    await fs.writeFile(outFile, result.base64img)
                    await angga23.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
                } catch (err) {
                    console.log(err)
                }
            } else {
				try {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    const base64img = imageBase64
                    const filename = "./media/img/noBg.png";
                    //console.log(base64img)
                    const outFile = './media/images/noBg.png'
                    const result = await removeBackgroundFromImageBase64({
                        base64img,
                        apiKey: 'BVS8kEvc8NkMYx1JBETzE4QT',
                        size: 'auto',
                        type: 'auto',
                        outFile
                    })
                    await fs.writeFile(outFile, result.base64img)
                    await angga23.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
                } catch (err) {
                    console.log(err)
                }
			}
            break*/
		case `${prefix}snobg`:
			if (!isVipUser) return angga23.reply(from, `Maaf ${pushname}, Hanya untuk VIP User Sasha!.`, id)
                try {
                    var mediaData = await decryptMedia(message, uaOverride)
                    var imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    var base64img = imageBase64
                    var outFile = './media/img/noBg.png'
                    // untuk api key kalian bisa dapatkan pada website remove.bg
                    var result = await removeBackgroundFromImageBase64({ base64img, apiKey: 'BVS8kEvc8NkMYx1JBETzE4QT', size: 'auto', type: 'auto', outFile })
                    await fs.writeFile(outFile, result.base64img)
                    await angga23.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
                } catch(err) {
                    console.log(err)
                }
            break
		/*case `${prefix}klasemen`:
		case `${prefix}klasmen`:
			if (!isGroupMsg) return angga23.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
			const klasemen = db.get('group').filter({id: groupId}).map('members').value()[0]
            let urut = Object.entries(klasemen).map(([key, val]) => ({id: key, ...val})).sort((a, b) => b.denda - a.denda);
            let textKlas = "*Klasemen Denda Sementara*\n"
            let i = 1;
            urut.forEach((klsmn) => {
            textKlas += i+". @"+klsmn.id.replace('@c.us', '')+" ➤ Rp"+formatin(klsmn.denda)+"\n"
            i++
            });
            await angga23.sendTextWithMentions(from, textKlas)
			break*/
			
			
		default:
            if (!isGroupMsg) return angga23.reply(from, `Jika Ingin Menggunakan Bot Harap Masuk Ke Dalam Grup Sasha, Link Ada Di Bio atau Bisa Mengetik ${prefix}sashagroup!\nJika Ingin Sewa Bot atau Bikin Bot Harap Ketik *${prefix}iklan*`, id)
            if (command.startsWith(`${prefix}`)) {
                angga23.reply(from, `Maaf ${pushname}, Command *${args[0]}* Tidak Terdaftar Di Dalam *${prefix}menu*!`, id)
            }
            await angga23.sendSeen(from) 
            }
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //angga23.kill().then(a => console.log(a))
    }
}

