// ========== js/products.js ==========
// Общие данные о всех товарах магазина

const productsData = {
    coldplay: {
        id: 'coldplay',
        name: 'Coldplay',
        album: 'Moon Music',
        fullTitle: 'Coldplay — Moon Music ’24',
        price: 7599,
        image: 'product1.jpg',
        status: 'NEW / ROCK',
        genre: 'rock'
    },
    miles: {
        id: 'miles',
        name: 'Miles Davis',
        album: 'Kind of Blue',
        fullTitle: 'Miles Davis — Kind of Blue',
        price: 6599,
        image: 'product2.jpg',
        status: 'NEW / JAZZ',
        genre: 'jazz'
    },
    queen: {
        id: 'queen',
        name: 'Queen',
        album: 'A Night at the Opera',
        fullTitle: 'Queen — A Night at the Opera',
        price: 8499,
        image: 'product3.jpg',
        status: 'USED / ROCK',
        genre: 'rock'
    },
    taylor: {
        id: 'taylor',
        name: 'Taylor Swift',
        album: '1989 (Taylor\'s Version)',
        fullTitle: 'Taylor Swift — 1989',
        price: 7999,
        image: 'product4.jpg',
        status: 'PRE-ORDER / POP',
        genre: 'pop'
    },
    beatles: {
        id: 'beatles',
        name: 'The Beatles',
        album: 'Abbey Road',
        fullTitle: 'The Beatles — Abbey Road',
        price: 8999,
        image: 'product5.jpg',
        status: 'NEW / ROCK',
        genre: 'rock'
    },
    lana: {
        id: 'lana',
        name: 'Lana Del Rey',
        album: 'Born to Die',
        fullTitle: 'Lana Del Rey — Born to Die',
        price: 7299,
        image: 'product6.jpg',
        status: 'NEW / POP',
        genre: 'pop'
    },
    britney: {
        id: 'britney',
        name: 'Britney Spears',
        album: '…Baby One More Time',
        fullTitle: 'Britney Spears — …Baby One More Time',
        price: 5499,
        image: 'product7.jpg',
        status: 'USED / POP',
        genre: 'pop'
    },
    arctic: {
        id: 'arctic',
        name: 'Arctic Monkeys',
        album: 'AM',
        fullTitle: 'Arctic Monkeys — AM',
        price: 6899,
        image: 'product8.jpg',
        status: 'RESTOCK / ALT',
        genre: 'alternative'
    },
    sinatra: {
        id: 'sinatra',
        name: 'Frank Sinatra',
        album: 'Sinatra at the Sands',
        fullTitle: 'Frank Sinatra — Sinatra at the Sands',
        price: 12999,
        image: 'product9.jpg',
        status: 'USED / JAZZ',
        genre: 'jazz'
    },
    celentano: {
        id: 'celentano',
        name: 'Adriano Celentano',
        album: 'Il Ragazzo della Via Gluck',
        fullTitle: 'Adriano Celentano — Il Ragazzo della Via Gluck',
        price: 14999,
        image: 'product10.jpg',
        status: 'USED / POP',
        genre: 'pop'
    },
    prince: {
        id: 'prince',
        name: 'Prince',
        album: 'Purple Rain',
        fullTitle: 'Prince — Purple Rain',
        price: 7699,
        image: 'product11.jpg',
        status: 'NEW / FUNK-SOUL',
        genre: 'funk-soul'
    },
    amy: {
        id: 'amy',
        name: 'Amy Winehouse',
        album: 'Back to Black',
        fullTitle: 'Amy Winehouse — Back to Black',
        price: 8999,
        image: 'product12.jpg',
        status: 'PRE-ORDER / FUNK-SOUL',
        genre: 'funk-soul'
    }
};

// Функция для получения всех товаров (массивом)
function getAllProducts() {
    return Object.values(productsData);
}

// Функция для получения товара по ID
function getProductById(id) {
    return productsData[id] || null;
}