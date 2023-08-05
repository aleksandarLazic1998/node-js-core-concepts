/*
EventEmitter

Ovo je basic sintaksa za kreiranje i emitovanje custom made event-ova:

const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on('event', () => {
  console.log('I have dispatched an event.');
});

myEmitter.emit('event');

*/

const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on('event', () => {
  console.log('I have dispatched an event.');
});

myEmitter.emit('event');

/*

Situacija A:
Imamo processor i sve i nas CPU ima 2 kora jedan je blokiran jer radi nesto a drugi je slobodan
U sinhronom nacinu rada drugi thread (core) cemo odvojiti da reaguje na kucanje na tastaturi sto je trosenje resursa

Situacija B:
Imamo istu postavku samo sto umesto da imamo odvojen thread koji je lociran na tastaturi on ima listener koji slusa na 
eventove, kada klikenmo na tastaturu on ce da primi taj even i zauzece taj kor dok se ne zavrsi proces
ovaj nacin rada zove se Asinhron ili ti Even Driven way. Gde kada se zavrsi processs thred (core) ce se osloboditi da 
slusa na druge eventove. Kada issuemo te eventove u strucnom nazivu se nazivaju "interupts".
*/

/*
Process sa situacijom kada imamo kod koji ima app.on("request",()=>) ide ovako
Request primimo preko network card-a, network card prosledi taj event processoru gde on odlucuje da li je taj request za nast domain
(localhost) example, processor prosledi to libuv i on ga prosledi event loop-u gde ce se on izvrsavati za code iz V8 dela
AKo imamo vise eventova istih emitovanih izvrsavace se kao u nizu jedan po jedan

Ako event emiter se emituje sa .once() metodom to znaci da ce se emitovati jednom i onda ce se remove iz event objekta
*/
