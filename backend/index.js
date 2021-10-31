import Dragon from "./dragon.js";

const fooey = new Dragon({ 
    birthdate: new Date(), 
    nickname: 'fooey'
})
const baloo = new Dragon({ 
    nickname: 'baloo',
    birthdate: new Date(), 
})

const goobey = new Dragon()

setTimeout(() => {
    const mimar = new Dragon()
    console.log('mimar', mimar)

}, 2000)

console.log('fooey', fooey)
console.log('baloo', baloo)
console.log('goobey', goobey)