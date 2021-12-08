const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');
const User = require('./models/User');
const Albums = require("./models/Album");
const Artist = require("./models/Artist");
const Track = require("./models/Track");

const run = async () => {
    await mongoose.connect(config.db.url);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, test] = await User.create({
            email: 'admin@admin.com',
            password: 'admin',
            token: nanoid(),
            displayName: 'Admin',
            role: 'admin',
        }, {
            email: 'test@test.com',
            password: 'test',
            token: nanoid(),
            displayName: 'Test',
            role: 'user'
        }
    );

    const [MariahCarey, AliciaKeys, DestinysChild, ChristinaMilian] = await Artist.create({
            name: "Mariah Carey",
            information: "Американская певица, автор песен, музыкальный продюсер, актриса и филантроп.",
            photo: "fixtures/Mariah_Carey.webp",
            user: admin,
            publish: true
        }, {
            name: "Alicia Keys",
            information: "Али́ша Одже́лло Кук, профессионально известная как Али́ша Киз, — американская певица, пианистка, автор песен, выступающая в стилях ритм-энд-блюз, соул и неосоул, лауреат пятнадцати наград «Грэмми».",
            photo: "fixtures/Fallin_Alicia_Keys.jpg",
            user: admin,
            publish: true
        }, {
            name: "Destiny’s Child",
            information: "Американская женская R'n'B и хип-хоп-группа. Появившись как квартет, она в конечном счёте стала трио в составе Бейонсе, Келли Роуленд и Мишель Уильямс. Группа выпустила четыре студийных альбома. На счету Destiny’s Child четыре сингла, достигших вершины хит-парада Billboard Hot 100.",
            photo: "fixtures/Destiny's_ChildA.jpeg",
            user: admin,
            publish: true
        }, {
            name: "ChristinaMilian",
            information: "Американская актриса и певица кубинского происхождения.",
            photo: "fixtures/375x375bb.webp",
            user: admin,
            publish: true
        }
    );

    const [Rainbow, Glitter, SongsinAMinor, TheDiaryofAliciaKeys, DestinysChildAlbum, Survivor, ChristinaMilianAlbum, ItsAboutTime] = await Albums.create({
        name: "Rainbow",
        artist: MariahCarey,
        year: "1999",
        image: 'fixtures/375x375bb Mariah cery ranbow.webp',
        user: admin,
        publish: true
    }, {
        name: "Glitter",
        artist: MariahCarey,
        year: "2001",
        image: 'fixtures/375x375bb (Mariah Cary Gliter)webp',
        user: admin,
        publish: true
    }, {
        name: "Songs in A Minor",
        artist: AliciaKeys,
        year: "2001",
        image: 'fixtures/AliciaKeys-SongsInAMinor-music-album.jpg',
        user: admin,
        publish: true
    }, {
        name: "The Diary of Alicia Keys",
        artist: AliciaKeys,
        year: "2003",
        image: 'fixtures/AliciaKeys-The diary.jpg',
        user: admin,
        publish: true
    }, {
        name: "Destiny’s Child",
        artist: DestinysChild,
        year: "1998",
        image: 'fixtures/Destiny\'s_ChildA.jpeg',
        user: admin,
        publish: false
    }, {
        name: "Survivor",
        artist: DestinysChild,
        year: "2001",
        image: 'fixtures/Destiny\'s_Child_Survivor.jpeg',
        user: admin,
        publish: true
    }, {
        name: "Christina Milian",
        artist: ChristinaMilian,
        year: "2001",
        image: 'fixtures/375x375bb.webp',
        user: admin,
        publish: true
    }, {
        name: "It’s About Time",
        artist: ChristinaMilian,
        year: "2004",
        image: 'fixtures/Christinamilian-itsabouttime.jpg',
        user: admin,
        publish: false
    },);

    await Track.create({
        name: "Heartbreaker",
        lasting: "4:46",
        trackNumber: 1,
        album: Rainbow,
        artist: MariahCarey,
        user: admin,
        publish: true
    }, {
        name: "Crybaby",
        lasting: "5:20",
        trackNumber: 10,
        album: Rainbow,
        artist: MariahCarey,
        user: admin,
        publish: true
    }, {
        name: "Lead the Way",
        lasting: "3:53",
        trackNumber: 2,
        album: Glitter,
        artist: MariahCarey,
        user: admin,
        publish: true
    }, {
        name: "Didn’t Mean to Turn You On",
        lasting: "4:54",
        trackNumber: 4,
        album: Glitter,
        artist: MariahCarey,
        user: admin,
        publish: true
    }, {
        name: "Girlfriend",
        lasting: "3:34",
        trackNumber: 2,
        album: SongsinAMinor,
        artist: AliciaKeys,
        user: admin,
        publish: true
    }, {
        name: "A Woman's Worth",
        lasting: "5:03",
        trackNumber: 7,
        album: SongsinAMinor,
        artist: AliciaKeys,
        user: admin,
        publish: true
    }, {
        name: "Karma",
        lasting: "4:16",
        trackNumber: 2,
        album: TheDiaryofAliciaKeys,
        artist: AliciaKeys,
        user: admin,
        publish: true
    }, {
        name: "Heartburn",
        lasting: "3:28",
        trackNumber: 3,
        album: TheDiaryofAliciaKeys,
        artist: AliciaKeys,
        user: admin,
        publish: true
    }, {
        name: "No, No, No Part 1",
        lasting: "4:00",
        trackNumber: 6,
        album: DestinysChildAlbum,
        artist: DestinysChild,
        user: admin,
        publish: true
    }, {
        name: "Show Me the Way",
        lasting: "4:20",
        trackNumber: 8,
        album: DestinysChildAlbum,
        artist: DestinysChild,
        user: admin,
        publish: true
    }, {
        name: "Survivor",
        lasting: "4:14",
        trackNumber: 2,
        album: Survivor,
        artist: DestinysChild,
        user: admin,
        publish: true
    }, {
        name: "Nasty Girl",
        lasting: "4:18",
        trackNumber: 4,
        album: Survivor,
        artist: DestinysChild,
        user: admin,
        publish: true
    }, {
        name: "You Make Me Laugh",
        lasting: "3:37",
        trackNumber: 6,
        album: ChristinaMilianAlbum,
        artist: ChristinaMilian,
        user: admin,
        publish: true
    }, {
        name: "Satisfaction Guaranteed",
        lasting: "3:45",
        trackNumber: 10,
        album: ChristinaMilianAlbum,
        artist: ChristinaMilian,
        user: admin,
        publish: true
    }, {
        name: "Dip It Low",
        lasting: "3:38",
        trackNumber: 2,
        album: ItsAboutTime,
        artist: ChristinaMilian,
        user: admin,
        publish: true
    }, {
        name: "Miss You Like Crazy",
        lasting: "4:49",
        trackNumber: 11,
        album: ItsAboutTime,
        artist: ChristinaMilian,
        user: admin,
        publish: true
    },);

    await mongoose.connection.close();
};

run().catch(console.error);