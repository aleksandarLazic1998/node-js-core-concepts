/*
Notes:

Node.js under the hood:
Processors mogu samo machine code da razumeju
Svaki processor ima svoj machine language
Svaki processor ima svoju arhitekturu i svaka arhitektura ima svoj jezik MIPS, ARM64, x86

Node.js treba neki nacin da komunicira sa bazom, da moze da radi as fajlovima i OS,
 isto tako je jako bitno da moze da radi scaling  tj da moze da scale-uje milione korisnika da koriste server,
 naravno da radi sa network requestovima sve se to u pozadini radi pomocu biblioteke Libuv

 Libuv opis sa Node.js dokumentacije: 

-libuv is a multi-platform support library with a focus on asynchronous I/O. It was primarily developed for use by Node.js, but it's also used by Luvit, Julia, uvloop, and others.

Feature highlights
Full-featured event loop backed by epoll, kqueue, IOCP, event ports.

2.Asynchronous DNS resolution
3.Asynchronous file and file system operations
4.File system events
5.ANSI escape code controlled TTY
6.IPC with socket sharing, using Unix domain sockets or named pipes (Windows) - Pipes je mogucnost komuniciranja izmedju procesa npr node js servera i DB servera i to funkcionise na OS nivou
7.Child processes
8.Thread pool
9.Signal handling
10.High resolution clock
11.Threading and synchronization primitives
12.


Operativni sistem je nesto sto komunicira izmedju programa procesa i hardware-a



Node.js ili ti JavaScript izvrsava nas kod sinhrono tacnije od prve do poslednje linije po redosledu<
To ce se desavati u single thread-u


U ovom kodu treba da logujemo "first" prvo,
zatim cemo uzeti is "fs" modula i pokrenucemo funkciju readFile(),
Taj proces ce se prebaciti u event loop stack-u i on ce krenuti da se izvrsava, posto rad sa fajlovima obavlja libuv
Libuv ce se obratiti nasem operativnom sistemu da uzme is OS storage-a datu u fajlu gde se on nalazi i vratiti to event loop stack-u
Kada u Event Loop-u se dobije povratna data, event loop vrati vrednost node.js procesu i izvrsi sledeci kod koji je zadat na primeru
Posto je asinhrono i kod nije blocking posle "first" log-a logovace se "second" pa tek onda ce se izvrsiti proces sa fs jer mu treba vise vremena

Ovo se zove event driven programing

process.Tick() je funkcija koju zelimo da izvrsimo na kraju kada se zavrsi main exekucija
Radi bukvalo kao u Golangu defer func()

console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
process.nextTick(() => {
  console.log(6);
});

event loop funkcionise tako da kod se izvrsava ako ima kod koji treba da udje u event loop 
on ce krenuti da se izvrsava tek kada se main procesi zavrse 

Node.js se trudi da sto manje koristi libuv thread pool
Node.js i event Loop mogu biti blocking i kada nesto treba da se izvrsi kao read file ili tako nesto sto radi libuv,

libuv po defaultu ima 4 threada koja mogu odmah da se upotrebe da se iskoriste. ali Node.js pokusava pomocu asinhronog koda sto vise da osobodi load sa libuv thread poola

*/
