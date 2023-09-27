# Pokemon Berry Store
_Hosted at [berries.peavot.com](https://berries.peavot.com)_

An imaginary store front that allows the customer to purchase* berries from Professor Oak and then enter delivery details for the berries to be delivered to**

*_No financial information is collected or required_

**_Berries may or may not be delivered_

This project was created to improve existing [Angular](https://angular.io/) knowledge and gain a foundational understanding of [NgRx](https://ngrx.io/) (state management), [Nx](https://nx.dev/) (monorepo management), and [Capacitor](https://capacitorjs.com/) (native app build tool)

## Getting Started

### Prerequisites
- Install the LTS release for [Node.js](https://nodejs.org/en/)

### Installation

1. Clone this repository
2. `npm install` in the root
3. `npm install` in the `apps/pokemon-berry-store` directory
4. `nx serve` to start the application
5. Navigate to `http://localhost:4200/` in your browser

This application was made for mobile devices so, I'd recommend putting your browser in mobile mode


### Building for a Native Platform
This project was written with building it as a native app using [Capacitor](https://capacitorjs.com/) in mind. If you would like to do this, you can find instructions below:

#### Android
Pre-requisite: You should have an android IDE installed such as [Android Studio](https://developer.android.com/studio)
1. `nx run berry-store:add:android` to add the Android platform
2. `nx run berry-store:build:android` to build the application
3. `nx run berry-store:open:android` to open the application in the IDE

#### IOS
Pre-requisite: You should have an IOS IDE installed such as [XCode](https://developer.apple.com/xcode/)

1. `nx run berry-store:add:ios` to add the IOS platform
2. `nx run berry-store:build:ios` to build the application
3. `nx run berry-store:open:ios` to open the application in the IDE

## Known Issues
- The locations list on the checkout screen takes a very long time to load (~10 to 15 seconds). The reason for this is that I (naively) load every single location from the Pokémon games into the DOM at once. All ~1000 of them.

## TODOs
- [ ] Order history page
- [ ] Pokemon team builder and berry suggester

_This readme was last updated on 2023-09-27_