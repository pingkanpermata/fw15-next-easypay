import { Nunito_Sans } from "@next/font/google";
import Link from "next/link";
import Image from "next/image";

const nunito_sans = Nunito_Sans({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <>
    <title>EasyPay</title>
      <nav className="flex bg-[#f5f5f5] px-20 py-5 items-center">
        <div className="grow">
          <Image className="w-[25%]" src="/logo-easypay.png" alt="" />
        </div>

        <div className="flex gap-3">
          <div>
            <Link href='/auth/login' className="rounded-xl py-2 px-8 w-[110px] font-bold border-2 border-[#dbc999] hover:bg-[#dac387] text-[#3b3524] hover:text-white bg-white">Login</Link>
          </div>
          <div>
            <Link href='/auth/register' className="rounded-xl py-2 px-6  w-[110px] font-bold border-2 border-[#dbc999] text-white bg-[#d3ba7a] hover:bg-[#d7c28a]">Sign Up</Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="flex px-20 gap-20 items-center justify-center bg-[#f5f5f5] pb-8">
          <div>
            <Image src="/Group 9.svg" alt="" />
          </div>

          <div className="flex flex-col gap-5">
            <div className="text-6xl font-bold w-[500px] leading-relaxed">
              Awesome App For Saving <span className="text-[#857752]">Time.</span>
            </div>

            <div>
              <div className="w-[400px] mb-7">We bring you a mobile app for banking problems that oftenly wasting much of your times.</div>
              <div>
                <button className="rounded-xl py-3 w-[150px] border-2 border-[#d3ba7a] text-white bg-[#d3ba7a] hover:bg-[#d7c28a]">Try It Free</button>
              </div>
            </div>

            <div>
              <div className="mb-5">Available On</div>
              <div className="flex gap-5">
                <div>
                  <Image src="/gplay.svg" alt="" />
                </div>

                <div>
                  <Image src="/appstore.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex bg-[#E5E5E5] px-20 py-14 ">
          <div className="grow">
            <Image src="/microsoft.svg" alt="" />
          </div>
          <div className="grow">
            <Image src="/dropbox.svg" alt="" />
          </div>
          <div className="grow">
            <Image src="/h&m.svg" alt="" />
          </div>
          <div className="grow">
            <Image src="/airbnb.svg" alt="" />
          </div>
          <div className="grow">
            <Image src="/canon.svg" alt="" />
          </div>
          <div className="grow">
            <Image src="/dell.svg" alt="" />
          </div>
        </section>

        <section className="bg-[#f5f5f5] px-20 py-20">
          <div className="text-center mb-10">
            <div className="text-6xl font-bold mb-10">
              <span className="text-[#857752]">About</span> the Application.
            </div>
            <p>
              We have some great features from the application and it’s totally <br /> free to use by all users around the world.
            </p>
          </div>

          <div className="flex gap-5 justify-center">
            <div className="card w-80">
              <div className="pt-5 px-10 pb-10 flex flex-col items-center text-center">
                <div>
                  <Image src="/phoneIcon.svg" alt="" />
                </div>
                <div className="font-bold mb-5 text-xl">24/7 Support</div>
                <div>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</div>
              </div>
            </div>
            <div className="card w-80 bg-white">
              <div className="pt-5 px-10 pb-10 flex flex-col items-center text-center">
                <div>
                  <Image src="/lockIcon.svg" alt="" />
                </div>
                <div className="font-bold mb-5 text-xl">Data Privacy</div>
                <div>We make sure your data is safe in our database and we will encrypt any data you submitted to us.</div>
              </div>
            </div>
            <div className="card w-80">
              <div className="pt-5 px-10 pb-10 flex flex-col items-center text-center">
                <div>
                  <Image src="/downloadIcon.svg" alt="" />
                </div>
                <div className="font-bold mb-5 text-xl">Easy Download</div>
                <div>EasyPay is 100% totally free to use it’s now available on Google Play Store and App Store.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex px-20 py-10 gap-20 items-center justify-center bg-[#E5E5E5]">
          <div>
            <Image src="/Group 8.svg" alt="" />
          </div>

          <div className="flex flex-col gap-5">
            <div className="text-6xl font-bold w-[500px] leading-relaxed">
              All The <span className="text-[#857752]">Great</span> <br />
              Trust-Pay Features.
            </div>

            <div className="card w-100 bg-white">
              <div className="p-5 flex flex-col">
                <div className="font-bold">
                  <span className="text-[#857752]">1.</span>Small Fee
                </div>
                <div>We only charge 5% of every success transaction done in EasyPay app.</div>
              </div>
            </div>

            <div className="card w-100 bg-white">
              <div className="p-5 flex flex-col">
                <div className="font-bold">
                  <span className="text-[#857752]">2.</span>Data Secured
                </div>
                <div>All your data is secured properly in our system and it’s encrypted.</div>
              </div>
            </div>

            <div className="card w-100 bg-white">
              <div className="p-5 flex flex-col">
                <div className="font-bold">
                  <span className="text-[#857752]">3.</span>User Friendly
                </div>
                <div>EasyPay come up with modern and sleek design and not complicated.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-20 pt-24 pb-20 bg-[#f5f5f5]">
          <div className="text-center mb-10">
            <div className="text-6xl font-bold mb-12">
              What Users are <span className="text-[#857752]">Saying.</span>
            </div>
            <div>We have some great features from the application and it’s totally free <br/> to use by all users around the world.</div>
          </div>

          <div className="flex gap-10 items-center">
            <div className='w-[50px]'>
              <button className="bg-white p-3 rounded-xl">
                <Image src='/arrow-left.svg' alt=""/>
              </button>
            </div>

            <div className="card w-full bg-white">
              <div className="pt-5 px-16 pb-10 flex flex-col items-center text-center">
                <div className="mb-5">
                  <Image src="/profile1.svg" alt="" />
                </div>
                <div className="font-bold mb-2 text-xl">Alex Hansinburg</div> 
                <div className="mb-7">Designer</div>
                <div>“This is the most outstanding app that I’ve ever try in my live, this app is such an amazing masterpiece and it’s suitable for you who is bussy with their bussiness and must transfer money to another person aut there. Just try this app and see the power!”</div>
              </div>
            </div>

            <div className='w-[50px]'>
              <button className="bg-white p-3 rounded-xl">
                <Image src='/arrow-right.svg' alt=""/>
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="
      bg-[#857752] px-20 py-14 text-white">
        <Image className="w-[15%]" src="/logo-easypay.png" alt="" />
        <div className="mb-8">Simplify financial needs and saving <br/> much time in banking needs with <br/> one single app.</div>
        <hr/>
        <div className="flex mt-5 gap-10">
          <div className="grow">2023 EasyPay. All right reserved.</div>
          <div>+62 889 7108 1537</div>
          <div>contact@EasyPay.com</div>
        </div>
      </footer>
    </>
  );
}
