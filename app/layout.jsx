import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Footer from "@components/Footer";

export const metadata = {
  title: "What The Scratch!",
  description: "Discover and Share Scratch Ideas!",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          {/* <div className='gradient' /> */}
        </div>

        <main className='app'>
          <Nav />
          {children}
          <Footer/>
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
