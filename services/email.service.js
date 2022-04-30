import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
  getById,
  query,
  remove,
  updateEmail,
  sendEmail,
  sortEmails,
}
function getById(emailId) {
  const emails = _loadFromStorage()
  const email = emails.find(email => emailId === email.id)
  return Promise.resolve(email)
}

function query(showByStatus, filterBy) {
  let emails = _loadFromStorage()
  if (!emails) {
    emails = _createemails()
    _saveToStorage(emails)
  }

  if (showByStatus)
    emails = emails.filter(email => email.status === showByStatus)
  if (filterBy.read) {
    const isRead = filterBy.read === 'read'
    emails = emails.filter(email => email.isRead === isRead)
  }
  if (filterBy.star) {
    const isStarred = filterBy.star === 'starred'
    emails = emails.filter(email => email.isStarred === isStarred)
  }
  if (filterBy.content) {
    emails = emails.filter(email => {
      return (
        email.body.includes(filterBy.content) ||
        email.subject.includes(filterBy.content) ||
        email.from.includes(filterBy.content) ||
        email.to.includes(filterBy.content)
      )
    }

    )
  }

  return Promise.resolve(emails)
}
function sendEmail(newEmail) {
  const emails = _loadFromStorage()
  const email = {
    id: utilService.makeId(),
    status: 'sent',
    subject: newEmail.subject,
    body: newEmail.body,
    isRead: true,
    isStarred: false,
    sentAt: Date.now(),
    from: 'muki@appsus.com',
    to: newEmail.to,
  }
  emails.push(email)
  _saveToStorage(emails)
  return Promise.resolve()
}

function remove(emailId) {
  let emails = _loadFromStorage()
  emails = emails.filter(email => email.id !== emailId)
  _saveToStorage(emails)
  return Promise.resolve()
}
function updateEmail(id, change) {
  const emails = _loadFromStorage()
  let email = emails.findIndex(email => id === email.id)
  emails[email] = { ...emails[email], ...change };
  _saveToStorage(emails);
  return Promise.resolve(email);
}

function sortEmails(emails) {
  _saveToStorage(emails)
  return Promise.resolve()
}

function _saveToStorage(emails) {
  storageService.saveToStorage('emailsDB', emails)
}

function _loadFromStorage() {
  return storageService.loadFromStorage('emailsDB')
}

function _createemails() {
  const emails = [{
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'Hello My Friend',
    body: 'Hello!\nHow are you? I had a great time last night, call me if you wanna hang out again..',
    isRead: true,
    isStarred: false,
    sentAt: 1627074009000,
    from: 'momo@gmail.com',
    to: 'muki@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'It`s here. Arturia FX Collection 2',
    body: 'Arturia never disappoints. Like never.\nTheir FX Collection 2 comes at us with it`s classic blend of vintage effects\
         and modern enhancers, now with 3 new Bus FX, 4 new Modulation FX, an updated preset browser, and 200 new presets. FX Collection 2\
          puts exceptional studio-quality effects in the hands of musicians and producers of all styles and abilities.\n\
          Try for free!',
    isRead: true,
    isStarred: true,
    sentAt: 1608757209000,
    from: 'hi@m.splice.com',
    to: 'muki@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'Introducing OB-Xa V: Legendary Growl Machine',
    body: "Hello Aviv,\nWe are beyond excited to announce the launch of our newest software instrument,\
         the OB-Xa V. Welcome to music history, reborn!\nOB-Xa V a recreation of Oberheim's legendary analog\
          synthesizer OB-Xa, whose dynamic sound made it into countless hits of some of the greatest artists.\n\
          The most recognizable moment of this analog synthesizer is the legendary intro in Van Halen`s hit `Jump`\
           and its powerful sonics appeared in many albums by iconic artists, such as Prince, The Police, or Queen.\
            Today, it`s used by the likes of Flume, Chrome Sparks, Calvin Harris, and Venetian Snares.",
    isRead: true,
    isStarred: true,
    sentAt: 1629236709000,
    from: 'hi@m.splice.com',
    to: 'muki@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'Account confirmation: Your Google Cloud free trial',
    body: 'Welcome to Google Cloud.\nLearn the fundamentals with this tutorial - and see what else you can do\
         for free on Google Cloud with our Always Free tier.\n\
         Welcome to your Google Cloud free trial. Beginning today,\n\
         you have $300 USD in credit to spend on Google Cloud. With your free trial, you can:\n\
         Use your credits to evaluate the platform risk-free*\n\
         Explore a wide range of Google Cloud products and services - from Compute Engine and BigQuery to App Engine and industry-leading AI\n\
         Easily check your credit usage by visiting the Cloud Billing section of your Google Cloud Console\n\
         Get hands-on now with this quick Cloud Console Tour, highlighting how to easily navigate, organize, and manage your projects.\n\
         To start exploring on your own, just visit your Cloud Console.',
    isRead: true,
    isStarred: true,
    sentAt: 1629723909000,
    from: 'CloudPlatform-noreply@google.com',
    to: 'muki@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'Massive Savings with Our Cyber Deals',
    body: 'Cyber Deals are here with 50% off!\n\
         Be ready to enjoy a massive 50% discount on Absolute Collection, Dorico, SpectraLayers,\
         Iconica, Nuendo Live and Cubasis. Just enter the coupon code at checkout or save directly\
         in the App Store or Google Play Store.\n\
        Get six of our industry-leading audio software applications for half the price! This offer is only valid until December 7, 2020.',
    isRead: true,
    isStarred: false,
    sentAt: 1630081327000,
    from: 'info@news.steinberg.net',
    to: 'muki@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'Social Authentication Added',
    body: 'Hi Muki,\nWe take your account security seriously and wanted to update you on a change to your account.\
        A Google login was just added to your existing Udemy account.\n\
        If you are aware of your Udemy account and the additional Google login, no action is needed on your part.\n\
        If you are unaware of this action, please protect the security of your account by changing your password.\n\
        If you have any other questions or concerns, please contact Support.',
    isRead: false,
    isStarred: false,
    sentAt: 1630088589000,
    from: 'no-reply@e.udemymail.com',
    to: 'muki@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'OpenWeatherMap API Instruction',
    body: 'Dear Customer!\n Thank you for subscribing to Free OpenWeatherMap!\n\
        - Your API key is asdadasdasdasdasdaszxvx\n\
        - Within the next couple of hours, it will be activated and ready to use\n\
        - You can later create more API keys on your account page\n\
        - Please, always use your API key in each API call',
    isRead: true,
    isStarred: false,
    sentAt: 1629915609000,
    from: 'robot@openweathermap.org',
    to: 'muki@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'Asi shared "CaJul21-Materials" with you',
    body: 'Hi Muki,\nAsi invited you to view the folder "CaJul21-Materials" on Dropbox.\n\
        Enjoy!\nThe Dropbox team.\nAsi and others will be able to see when you view files in this folder. \
        Other files shared with you through Dropbox may also show this info.Learn more in our help center.',
    isRead: false,
    isStarred: false,
    sentAt: 1629465009000,
    from: 'no-reply@dropbox.com',
    to: 'muki@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'Just one more step to complete your Dropbox setup',
    body: 'Hi Muki,\n Your account is almost ready! To get the most out of Dropbox, be sure to install \
        Dropbox on your computer and phone.\n\
        Any file you save to your Dropbox will automatically save to all your computers, phones and even the Dropbox website.\n\
        Dropbox also lets you easily share docs and photos, and collaborate with friends.',
    isRead: true,
    isStarred: true,
    sentAt: 1623707769000,
    from: 'no-reply@dropboxmail.com',
    to: 'muki@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'My New Course - The Last Chance!',
    body: "Hey Everyone!\nPlease excuse the overly dramatic subject line. This is not the last chance ever to purchase my new \
        Command Line course, but it is the last chance to use the $9.99 coupon before it expires. If you missed my original announcement,\n\
         here's a bit more about the course...",
    isRead: true,
    isStarred: false,
    sentAt: 1624704969000,
    from: 'no-reply@e.udemymail.com',
    to: 'muki@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'simple arrangement techniques that work [VIDEO]',
    body: "In this week`s video, we`re carrying on from where we left off last week, where Recording Revolution founder Graham Cochrane \
        showed 4 simple tricks to get a killer arrangement in a song…\n\
        And he's revealing even more arrangement techniques that keep the listener interested in repeated choruses, bridges, and more.\n\
        From a sneaky vocal recording technique to more percussion layers…\n\
        If you ever struggle to get your tracks to sound “pro” and finished, this tutorial`s for you.",
    isRead: true,
    isStarred: false,
    sentAt: 1617852129000,
    from: 'support@recordingrevolution.com',
    to: 'muki@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'ata totoach',
    body: 'ain ain alecha meta alecha ata hgdol mekulam',
    isRead: true,
    isStarred: false,
    sentAt: 1614921729000,
    from: 'sarit@hadad.com',
    to: 'muki@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'YOU WON THE LOTTERY!',
    body: "Dear Muki!\nI'm happy to inform you that you won the lottery!\n\n\nApril fools!!!",
    isRead: true,
    isStarred: true,
    sentAt: 1617254529000,
    from: 'mika@appsus.com',
    to: 'muki@appsus.com',
  },
  //#endregion
  //#region SENT
  {
    id: utilService.makeId(),
    status: 'sent',
    subject: 'Pizza',
    body: 'Hey Mika!\nDo you wanna eat pizza tomorrow?\nCall me if you wanna hangout',
    isRead: true,
    isStarred: false,
    sentAt: 1627074009002,
    from: 'muki@appsus.com',
    to: 'mika@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'sent',
    subject: 'Coding Academy',
    body: 'Hey,\nCan you tell me more about Coding Academy?\nI heard nice things about it.',
    isRead: true,
    isStarred: false,
    sentAt: 1630081327001,
    from: 'muki@appsus.com',
    to: 'mika@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'sent',
    subject: 'What is Lorem Ipsum?',
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy \
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived \
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s \
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker \
        including versions of Lorem Ipsum.",
    isRead: true,
    isStarred: false,
    sentAt: 1609478529000,
    from: 'muki@appsus.com',
    to: 'johnny@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'sent',
    subject: 'Photos from last night',
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy \
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived \
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s \
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker \
        including versions of Lorem Ipsum.",
    isRead: true,
    isStarred: false,
    sentAt: 1620595329000,
    from: 'muki@appsus.com',
    to: 'johnny@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'sent',
    subject: 'Lets go to the circus',
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy \
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived \
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s \
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker \
        including versions of Lorem Ipsum.",
    isRead: true,
    isStarred: false,
    sentAt: 1620495329000,
    from: 'muki@appsus.com',
    to: 'yummy@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'sent',
    subject: 'PARTY AT MY PLACE',
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy \
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived \
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s \
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker \
        including versions of Lorem Ipsum.",
    isRead: true,
    isStarred: false,
    sentAt: 1620491329000,
    from: 'muki@appsus.com',
    to: 'idk@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'sent',
    subject: 'Diablo',
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy \
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived \
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s \
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker \
        including versions of Lorem Ipsum.",
    isRead: true,
    isStarred: false,
    sentAt: 1623002769000,
    from: 'muki@appsus.com',
    to: 'diablo@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'sent',
    subject: 'no subject',
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy \
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived \
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s \
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker \
        including versions of Lorem Ipsum.",
    isRead: true,
    isStarred: false,
    sentAt: 1609956369000,
    from: 'muki@appsus.com',
    to: 'tatltu@appsus.com',
  },
    //#endregion
    //#region DRAFTS
    //   {
    //     id: utilService.makeId(),
    //     status: 'draft',
    //     subject: 'I love you',
    //     body: 'Hey Mika!\nI thought about it a lot and...I love you.\nWill you marry me?',
    //     isRead: true,
    //     isStarred: false,
    //     sentAt: 1627074009001,
    //     from: 'muki@appsus.com',
    //     to: 'mika@appsus.com',
    //   },
    //   {
    //     id: utilService.makeId(),
    //     status: 'draft',
    //     subject: 'Last Night',
    //     body: 'Hey Mika!\nLast night was so fun.\nWill you marry me?',
    //     isRead: true,
    //     isStarred: false,
    //     sentAt: 1621074009000,
    //     from: 'muki@appsus.com',
    //     to: 'mika@appsus.com',
    //   },
    //   {
    //     id: utilService.makeId(),
    //     status: 'draft',
    //     subject: 'Ice Cream',
    //     body: 'Hey Mika!\nDo you wanna go eat icecream sometime?.\nJust the two of us?',
    //     isRead: true,
    //     isStarred: false,
    //     sentAt: 1621974009000,
    //     from: 'muki@appsus.com',
    //     to: 'mika@appsus.com',
    //   },
    //#endregion
  ];
  return emails
}