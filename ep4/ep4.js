/* Buffers

Da bi razumeli bafere moramo da znamo ova 4 topic-a:

1. Binary data
2. Binary numbers (base 2 numbers)
3. Hexadecimal numbers (base 16 numbers)
4. Character set encodings (Unicode and utf-8)



1. Binary data je data koja ima dva stanja 0 i 1

2. Character set je sistem gde je skup nekih karaktera reprezentovan brojevima


Jako je bitno da se specificira encoding sistem po kom radimo




Buffer je kontejner u memoriji koji ima fiksnu velicinu koji dobije neku datu i odmah je posalje negde drugde
Ideja buffera je da baffer primi datu mi uradtimo nesto sa tom datom i poslaljemo je nazad bafferu da odradi ostatak posla (prosledi je dalje)


Buffery nam trebaju da bi node.js mogao da radi sa requestovima, fajlovima itd iz razloga zato sto JavaScript ne moze da radi sa raw binary datom
A Buffer sluzi da radi sa bytes and bits
*/
const { Buffer } = require('buffer');

const buffer = Buffer.alloc(8);

console.log(buffer);
// <Buffer 00 00 00 00 00 00 00 00> svaka od ovih 00 je reprezentovana kao hexdecimalni broj i ima tezinu jednog bajta

// U Buffer se moze isto i upisivati data sa .write("vrednost koju upisujemo", "encoding sistem po defaultu je utf-8") metodom

buffer.write('s', 'utf-8');
console.log(buffer); // <Buffer 73 00 00 00 00 00 00 00>

buffer.write('string', 'utf-8');
console.log(buffer); // <Buffer 73 74 72 69 6e 67 00 00>

// Buffer datu mozemo videti u JSON formatu isto
console.log(buffer.toJSON());
/*
{
  type: 'Buffer',
  data: [ 115, 116, 114, 105, 110, 103, 0, 0 ]
}
*/
/*
Buffer ima fixed length size
ukoliko nam je velicina 8 a unesemo npr 10 komada ignorisace zadnja 2

Buffer je ukratko a temporarily place to hold a fixed length of bytes
*/

/*
Metoda .from() je metoda koja nam pomaze da nam kaze koliki size ce nam nas buffer imati za odredjenu kolicinu stringa
nad tom metodom mozemo da chain metodu .byteLength koja ce nam vratiti velicinu tog buffer-a
*/

const bufferSize = Buffer.from('string', 'utf-8');
console.log(bufferSize); // <Buffer 73 74 72 69 6e 67>
console.log(bufferSize.byteLength); // 6

/*
Bufferu isto mozemo dati niz brojeva koje obicno smo mogli videti kada smo pretvarali buffer u json format
kao rezultat dobicemo <Buffer xnumxnum ...>, ali sa metodom .toString('encoding type') mozemo dobiti string koji celimo videti
*/

const buffer3 = Buffer.from([115, 116, 114, 105, 110, 103, 0, 0]);
console.log(buffer3); // <Buffer 73 74 72 69 6e 67 00 00>
console.log(buffer3.toString('utf-8')); // string
