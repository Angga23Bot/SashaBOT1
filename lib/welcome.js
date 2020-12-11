const fs = require('fs-extra')

module.exports = welcome = async (tobz, event) => {
    //console.log(event.action)
    const welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
    const isWelkom = welkom.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkom) {
            const gChat = await tobz.getChatById(event.chat)
            const pChat = await tobz.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await tobz.getProfilePicFromServer(event.who)
            const capt = `Halo @${event.who.replace('@c.us', '')} ðŸ‘‹\nSelamat datang di *Grup ${name}*\. 
*INTRO NEW MEMBER*
_1. Name:_ 
_2. Age:_
_3. Status:_
_4. Gender:_
_5. Hometown:_
_6. City Now:_
_7. Favorit Anime:_
    - 
    -
    -
_8. Favorite Game:_
    -
    -
    -
_9. Reasons for Entering the Group:_

*• Don't forget to read the description first.*
*• Thank you for joining, and hope you feel at home.*
`
            if (pepe == '' || pepe == undefined) {
                await tobz.sendFileFromUrl(event.chat, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg')
            } else {
                await tobz.sendFileFromUrl(event.chat, pepe, 'profile.jpg')
                tobz.sendTextWithMentions(event.chat, capt)
            }

        }
    } catch (err) {
        console.log(err)
    }
}
