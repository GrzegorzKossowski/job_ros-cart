[
  '{{repeat(15, 20)}}',
  {
    id: '{{objectId()}}',
    brand: '{{company().toUpperCase()}}',
    name: '{{company()}}',
    caption: '{{lorem(1, "paragraphs")}}',
    unit: '{{random(integer(1,10) + " szt.", integer(50,500) + " ml")}}',
    price: '{{floating(10, 40, 2, "$0,0.00")}}',
    pictures: [
      {id: '{{guid()}}',
       mini: 'http://placehold.it/18x55',
       medium: 'http://placehold.it/113x338',
       small: 'http://placehold.it/120x360',
       large: 'http://placehold.it/429x1280'
      }
    ],
    averageRating: '{{floating(0, 5, 1, "0.0")}}',
    totalReviews: '{{integer(99,999)}}'
  }
]

