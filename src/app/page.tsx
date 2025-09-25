// Figma design assets
const imgImg3 = "/2083fbe6dc030f224d9634513073793252711562.png";
const imgImg1 = "/9f2ccc682b3eb2b90162328bc521d584cd769cc7.png";
const imgImg2 = "/a813a406f6410ce1c05b65426496482113ebe50d.png";
const imgImg4 = "/9d6428d71a04a212d3425f0ad9dac0d21cde4e33.png";
const imgImg5 = "/ec18898850b581c9cfef6c22da3ccd5ff291b9a4.png";
const imgImg6 = "/689da4915f5a961d7fde59fd5c2088cd43895ab2.png";
const imgImg7 = "/79d5f710f747bf7bcc951f0a55348d500cb92049.png";
const imgImg8 = "/c0a1f22b0881d1c952843e29147bbf9f8c7e54d9.png";
const imgImg9 = "/d46a3092c64e08b718686187d75000cbd6a1e39e.png";
const imgImg10 = "/2ca6f758a749373e7dd3d8d1a89aec6115a09d6a.png";
const imgImg11 = "/6a28a834dfbf192f2fcf55c9a6a854a65a1f0578.png";
const imgImg12 = "/dddc4c6f842bd1e0286c62f59446050b33756647.png";
const imgImg13 = "/cad4029ebb93153e461c5215550966e2a317caf4.png";
const imgImg14 = "/7546f49eded88bee31cc4c2e9b2a5299c9df15c6.png";
const imgVector = "/b881716201b5d20045405896f59167605f626ad1.svg";
const imgLikeIcon = "/3b9cd10075f5938d9a1b95e301babe662ce69cdc.svg";
const imgVector1 = "/d37bcdb8639824574bb259677183f9fc87ba6464.svg";

export default function HomePage() {

  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[40px] items-center px-[64px] py-[36px] relative size-full">
      {/* Category 1 - Fotostudier nær Aarhus */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="font-['Montserrat:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
              <p className="leading-[normal] whitespace-pre">Fotostudier nær Aarhus</p>
            </div>
            <div className="flex h-[10px] items-center justify-center relative shrink-0 w-[5px]">
              <div className="flex-none rotate-[90deg]">
                <div className="w-[5px] h-[10px] relative">
                  <img alt="" className="block w-full h-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {/* Items 1-7 for Category 1 */}
            {[imgImg3, imgImg1, imgImg2, imgImg4, imgImg5, imgImg6, imgImg7].map((img, index) => (
              <div key={index} className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                <div className="aspect-[211.667/211.67] bg-[#a6a6a6] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] box-border content-stretch flex gap-[10px] items-start overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundImage: `url('${img}')` }}>
                  <div className="basis-0 content-stretch flex gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                      <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                        <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.12px]">
                          <p className="leading-[normal] whitespace-pre">Populær</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[29px] h-[26px] relative shrink-0">
                      <img alt="" className="block w-full h-full" src={imgLikeIcon} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                  <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-gray-950 text-nowrap tracking-[-0.1px]">
                    <p className="leading-[normal] whitespace-pre">Studio i Aarhus</p>
                  </div>
                  <div className="content-stretch flex font-['Montserrat:Regular',_sans-serif] gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Halv/Hel dags leje</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">•</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Backdrop inkl.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-[112px]">
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">5.000 - 10.000 kr.</p>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">•</p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="w-[7px] h-[7px] relative shrink-0">
                        <img alt="" className="block w-full h-full" src={imgVector1} />
                      </div>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">4,9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category 2 - Lydstudier nær Aarhus */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="font-['Montserrat:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
              <p className="leading-[normal] whitespace-pre">Lydstudier nær Aarhus</p>
            </div>
            <div className="flex h-[10px] items-center justify-center relative shrink-0 w-[5px]">
              <div className="flex-none rotate-[90deg]">
                <div className="w-[5px] h-[10px] relative">
                  <img alt="" className="block w-full h-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {/* Items 1-7 for Category 2 */}
            {[imgImg8, imgImg9, imgImg10, imgImg11, imgImg12, imgImg13, imgImg14].map((img, index) => (
              <div key={index} className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                <div className="aspect-[211.667/211.67] bg-[#a6a6a6] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] box-border content-stretch flex gap-[10px] items-start overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundImage: `url('${img}')` }}>
                  <div className="basis-0 content-stretch flex gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                      <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                        <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.12px]">
                          <p className="leading-[normal] whitespace-pre">Populær</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[29px] h-[26px] relative shrink-0">
                      <img alt="" className="block w-full h-full" src={imgLikeIcon} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                  <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-gray-950 text-nowrap tracking-[-0.1px]">
                    <p className="leading-[normal] whitespace-pre">Studio i Aarhus</p>
                  </div>
                  <div className="content-stretch flex font-['Montserrat:Regular',_sans-serif] gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Halv/Hel dags leje</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">•</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Backdrop inkl.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-[112px]">
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">5.000 - 10.000 kr.</p>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">•</p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="w-[7px] h-[7px] relative shrink-0">
                        <img alt="" className="block w-full h-full" src={imgVector1} />
                      </div>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">4,9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category 3 - Filmstudier nær Aarhus */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="font-['Montserrat:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
              <p className="leading-[normal] whitespace-pre">Filmstudier nær Aarhus</p>
            </div>
            <div className="flex h-[10px] items-center justify-center relative shrink-0 w-[5px]">
              <div className="flex-none rotate-[90deg]">
                <div className="w-[5px] h-[10px] relative">
                  <img alt="" className="block w-full h-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {/* Items 1-7 for Category 3 */}
            {[imgImg3, imgImg1, imgImg2, imgImg4, imgImg5, imgImg6, imgImg7].map((img, index) => (
              <div key={index} className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                <div className="aspect-[211.667/211.67] bg-[#a6a6a6] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] box-border content-stretch flex gap-[10px] items-start overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundImage: `url('${img}')` }}>
                  <div className="basis-0 content-stretch flex gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                      <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                        <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.12px]">
                          <p className="leading-[normal] whitespace-pre">Populær</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[29px] h-[26px] relative shrink-0">
                      <img alt="" className="block w-full h-full" src={imgLikeIcon} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                  <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-gray-950 text-nowrap tracking-[-0.1px]">
                    <p className="leading-[normal] whitespace-pre">Studio i Aarhus</p>
                  </div>
                  <div className="content-stretch flex font-['Montserrat:Regular',_sans-serif] gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Halv/Hel dags leje</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">•</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Backdrop inkl.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-[112px]">
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">5.000 - 10.000 kr.</p>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">•</p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="w-[7px] h-[7px] relative shrink-0">
                        <img alt="" className="block w-full h-full" src={imgVector1} />
                      </div>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">4,9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category 4 - Musikstudier nær Aarhus */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="font-['Montserrat:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
              <p className="leading-[normal] whitespace-pre">Musikstudier nær Aarhus</p>
            </div>
            <div className="flex h-[10px] items-center justify-center relative shrink-0 w-[5px]">
              <div className="flex-none rotate-[90deg]">
                <div className="w-[5px] h-[10px] relative">
                  <img alt="" className="block w-full h-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {/* Items 1-7 for Category 4 */}
            {[imgImg8, imgImg9, imgImg10, imgImg11, imgImg12, imgImg13, imgImg14].map((img, index) => (
              <div key={index} className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                <div className="aspect-[211.667/211.67] bg-[#a6a6a6] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] box-border content-stretch flex gap-[10px] items-start overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundImage: `url('${img}')` }}>
                  <div className="basis-0 content-stretch flex gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                      <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                        <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.12px]">
                          <p className="leading-[normal] whitespace-pre">Populær</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[29px] h-[26px] relative shrink-0">
                      <img alt="" className="block w-full h-full" src={imgLikeIcon} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                  <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-gray-950 text-nowrap tracking-[-0.1px]">
                    <p className="leading-[normal] whitespace-pre">Studio i Aarhus</p>
                  </div>
                  <div className="content-stretch flex font-['Montserrat:Regular',_sans-serif] gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Halv/Hel dags leje</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">•</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Backdrop inkl.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-[112px]">
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">5.000 - 10.000 kr.</p>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">•</p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="w-[7px] h-[7px] relative shrink-0">
                        <img alt="" className="block w-full h-full" src={imgVector1} />
                      </div>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">4,9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category 5 - Makerspaces */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="font-['Montserrat:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
              <p className="leading-[normal] whitespace-pre">Makerspaces</p>
            </div>
            <div className="flex h-[10px] items-center justify-center relative shrink-0 w-[5px]">
              <div className="flex-none rotate-[90deg]">
                <div className="w-[5px] h-[10px] relative">
                  <img alt="" className="block w-full h-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {[imgImg3, imgImg1, imgImg2, imgImg4, imgImg5, imgImg6, imgImg7].map((img, index) => (
              <div key={index} className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                <div className="aspect-[211.667/211.67] bg-[#a6a6a6] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] box-border content-stretch flex gap-[10px] items-start overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundImage: `url('${img}')` }}>
                  <div className="basis-0 content-stretch flex gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                      <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                        <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.12px]">
                          <p className="leading-[normal] whitespace-pre">Populær</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[29px] h-[26px] relative shrink-0">
                      <img alt="" className="block w-full h-full" src={imgLikeIcon} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                  <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-gray-950 text-nowrap tracking-[-0.1px]">
                    <p className="leading-[normal] whitespace-pre">Studio i Aarhus</p>
                  </div>
                  <div className="content-stretch flex font-['Montserrat:Regular',_sans-serif] gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Halv/Hel dags leje</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">•</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Backdrop inkl.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-[112px]">
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">5.000 - 10.000 kr.</p>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">•</p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="w-[7px] h-[7px] relative shrink-0">
                        <img alt="" className="block w-full h-full" src={imgVector1} />
                      </div>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">4,9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category 6 - Meeting Rooms */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="font-['Montserrat:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
              <p className="leading-[normal] whitespace-pre">Meeting Rooms</p>
            </div>
            <div className="flex h-[10px] items-center justify-center relative shrink-0 w-[5px]">
              <div className="flex-none rotate-[90deg]">
                <div className="w-[5px] h-[10px] relative">
                  <img alt="" className="block w-full h-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {[imgImg8, imgImg9, imgImg10, imgImg11, imgImg12, imgImg13, imgImg14].map((img, index) => (
              <div key={index} className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                <div className="aspect-[211.667/211.67] bg-[#a6a6a6] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] box-border content-stretch flex gap-[10px] items-start overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundImage: `url('${img}')` }}>
                  <div className="basis-0 content-stretch flex gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                      <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                        <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.12px]">
                          <p className="leading-[normal] whitespace-pre">Populær</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[29px] h-[26px] relative shrink-0">
                      <img alt="" className="block w-full h-full" src={imgLikeIcon} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                  <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-gray-950 text-nowrap tracking-[-0.1px]">
                    <p className="leading-[normal] whitespace-pre">Studio i Aarhus</p>
                  </div>
                  <div className="content-stretch flex font-['Montserrat:Regular',_sans-serif] gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Halv/Hel dags leje</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">•</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Backdrop inkl.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-[112px]">
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">5.000 - 10.000 kr.</p>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">•</p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="w-[7px] h-[7px] relative shrink-0">
                        <img alt="" className="block w-full h-full" src={imgVector1} />
                      </div>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">4,9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category 7 - Workspaces */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="font-['Montserrat:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
              <p className="leading-[normal] whitespace-pre">Workspaces</p>
            </div>
            <div className="flex h-[10px] items-center justify-center relative shrink-0 w-[5px]">
              <div className="flex-none rotate-[90deg]">
                <div className="w-[5px] h-[10px] relative">
                  <img alt="" className="block w-full h-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {[imgImg3, imgImg1, imgImg2, imgImg4, imgImg5, imgImg6, imgImg7].map((img, index) => (
              <div key={index} className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                <div className="aspect-[211.667/211.67] bg-[#a6a6a6] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] box-border content-stretch flex gap-[10px] items-start overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundImage: `url('${img}')` }}>
                  <div className="basis-0 content-stretch flex gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                      <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                        <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.12px]">
                          <p className="leading-[normal] whitespace-pre">Populær</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[29px] h-[26px] relative shrink-0">
                      <img alt="" className="block w-full h-full" src={imgLikeIcon} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                  <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-gray-950 text-nowrap tracking-[-0.1px]">
                    <p className="leading-[normal] whitespace-pre">Studio i Aarhus</p>
                  </div>
                  <div className="content-stretch flex font-['Montserrat:Regular',_sans-serif] gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Halv/Hel dags leje</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">•</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Backdrop inkl.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-[112px]">
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">5.000 - 10.000 kr.</p>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">•</p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="w-[7px] h-[7px] relative shrink-0">
                        <img alt="" className="block w-full h-full" src={imgVector1} />
                      </div>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">4,9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category 8 - Event Venues */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="font-['Montserrat:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
              <p className="leading-[normal] whitespace-pre">Event Venues</p>
            </div>
            <div className="flex h-[10px] items-center justify-center relative shrink-0 w-[5px]">
              <div className="flex-none rotate-[90deg]">
                <div className="w-[5px] h-[10px] relative">
                  <img alt="" className="block w-full h-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {[imgImg8, imgImg9, imgImg10, imgImg11, imgImg12, imgImg13, imgImg14].map((img, index) => (
              <div key={index} className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                <div className="aspect-[211.667/211.67] bg-[#a6a6a6] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] box-border content-stretch flex gap-[10px] items-start overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundImage: `url('${img}')` }}>
                  <div className="basis-0 content-stretch flex gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                      <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                        <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.12px]">
                          <p className="leading-[normal] whitespace-pre">Populær</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[29px] h-[26px] relative shrink-0">
                      <img alt="" className="block w-full h-full" src={imgLikeIcon} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                  <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-gray-950 text-nowrap tracking-[-0.1px]">
                    <p className="leading-[normal] whitespace-pre">Studio i Aarhus</p>
                  </div>
                  <div className="content-stretch flex font-['Montserrat:Regular',_sans-serif] gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Halv/Hel dags leje</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">•</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Backdrop inkl.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-[112px]">
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">5.000 - 10.000 kr.</p>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">•</p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="w-[7px] h-[7px] relative shrink-0">
                        <img alt="" className="block w-full h-full" src={imgVector1} />
                      </div>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">4,9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category 9 - Galleries */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="font-['Montserrat:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
              <p className="leading-[normal] whitespace-pre">Galleries</p>
            </div>
            <div className="flex h-[10px] items-center justify-center relative shrink-0 w-[5px]">
              <div className="flex-none rotate-[90deg]">
                <div className="w-[5px] h-[10px] relative">
                  <img alt="" className="block w-full h-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {[imgImg3, imgImg1, imgImg2, imgImg4, imgImg5, imgImg6, imgImg7].map((img, index) => (
              <div key={index} className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                <div className="aspect-[211.667/211.67] bg-[#a6a6a6] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] box-border content-stretch flex gap-[10px] items-start overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundImage: `url('${img}')` }}>
                  <div className="basis-0 content-stretch flex gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                      <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                        <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.12px]">
                          <p className="leading-[normal] whitespace-pre">Populær</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[29px] h-[26px] relative shrink-0">
                      <img alt="" className="block w-full h-full" src={imgLikeIcon} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                  <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-gray-950 text-nowrap tracking-[-0.1px]">
                    <p className="leading-[normal] whitespace-pre">Studio i Aarhus</p>
                  </div>
                  <div className="content-stretch flex font-['Montserrat:Regular',_sans-serif] gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Halv/Hel dags leje</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">•</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Backdrop inkl.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-[112px]">
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">5.000 - 10.000 kr.</p>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">•</p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="w-[7px] h-[7px] relative shrink-0">
                        <img alt="" className="block w-full h-full" src={imgVector1} />
                      </div>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">4,9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category 10 - Rooftops */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="font-['Montserrat:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
              <p className="leading-[normal] whitespace-pre">Rooftops</p>
            </div>
            <div className="flex h-[10px] items-center justify-center relative shrink-0 w-[5px]">
              <div className="flex-none rotate-[90deg]">
                <div className="w-[5px] h-[10px] relative">
                  <img alt="" className="block w-full h-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {[imgImg8, imgImg9, imgImg10, imgImg11, imgImg12, imgImg13, imgImg14].map((img, index) => (
              <div key={index} className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                <div className="aspect-[211.667/211.67] bg-[#a6a6a6] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] box-border content-stretch flex gap-[10px] items-start overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundImage: `url('${img}')` }}>
                  <div className="basis-0 content-stretch flex gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                      <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                        <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.12px]">
                          <p className="leading-[normal] whitespace-pre">Populær</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[29px] h-[26px] relative shrink-0">
                      <img alt="" className="block w-full h-full" src={imgLikeIcon} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                  <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-gray-950 text-nowrap tracking-[-0.1px]">
                    <p className="leading-[normal] whitespace-pre">Studio i Aarhus</p>
                  </div>
                  <div className="content-stretch flex font-['Montserrat:Regular',_sans-serif] gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Halv/Hel dags leje</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">•</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Backdrop inkl.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-[112px]">
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">5.000 - 10.000 kr.</p>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">•</p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="w-[7px] h-[7px] relative shrink-0">
                        <img alt="" className="block w-full h-full" src={imgVector1} />
                      </div>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">4,9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category 11 - Pop-up Shops */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="font-['Montserrat:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
              <p className="leading-[normal] whitespace-pre">Pop-up Shops</p>
            </div>
            <div className="flex h-[10px] items-center justify-center relative shrink-0 w-[5px]">
              <div className="flex-none rotate-[90deg]">
                <div className="w-[5px] h-[10px] relative">
                  <img alt="" className="block w-full h-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {[imgImg3, imgImg1, imgImg2, imgImg4, imgImg5, imgImg6, imgImg7].map((img, index) => (
              <div key={index} className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                <div className="aspect-[211.667/211.67] bg-[#a6a6a6] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] box-border content-stretch flex gap-[10px] items-start overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundImage: `url('${img}')` }}>
                  <div className="basis-0 content-stretch flex gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                      <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                        <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.12px]">
                          <p className="leading-[normal] whitespace-pre">Populær</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[29px] h-[26px] relative shrink-0">
                      <img alt="" className="block w-full h-full" src={imgLikeIcon} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                  <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-gray-950 text-nowrap tracking-[-0.1px]">
                    <p className="leading-[normal] whitespace-pre">Studio i Aarhus</p>
                  </div>
                  <div className="content-stretch flex font-['Montserrat:Regular',_sans-serif] gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Halv/Hel dags leje</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">•</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Backdrop inkl.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-[112px]">
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">5.000 - 10.000 kr.</p>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">•</p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="w-[7px] h-[7px] relative shrink-0">
                        <img alt="" className="block w-full h-full" src={imgVector1} />
                      </div>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">4,9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category 12 - Studios */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="font-['Montserrat:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
              <p className="leading-[normal] whitespace-pre">Studios</p>
            </div>
            <div className="flex h-[10px] items-center justify-center relative shrink-0 w-[5px]">
              <div className="flex-none rotate-[90deg]">
                <div className="w-[5px] h-[10px] relative">
                  <img alt="" className="block w-full h-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {[imgImg8, imgImg9, imgImg10, imgImg11, imgImg12, imgImg13, imgImg14].map((img, index) => (
              <div key={index} className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                <div className="aspect-[211.667/211.67] bg-[#a6a6a6] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] box-border content-stretch flex gap-[10px] items-start overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundImage: `url('${img}')` }}>
                  <div className="basis-0 content-stretch flex gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                      <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                        <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.12px]">
                          <p className="leading-[normal] whitespace-pre">Populær</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[29px] h-[26px] relative shrink-0">
                      <img alt="" className="block w-full h-full" src={imgLikeIcon} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                  <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-gray-950 text-nowrap tracking-[-0.1px]">
                    <p className="leading-[normal] whitespace-pre">Studio i Aarhus</p>
                  </div>
                  <div className="content-stretch flex font-['Montserrat:Regular',_sans-serif] gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Halv/Hel dags leje</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">•</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Backdrop inkl.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-[112px]">
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">5.000 - 10.000 kr.</p>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">•</p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="w-[7px] h-[7px] relative shrink-0">
                        <img alt="" className="block w-full h-full" src={imgVector1} />
                      </div>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">4,9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category 13 - Industrial Spaces */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="font-['Montserrat:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
              <p className="leading-[normal] whitespace-pre">Industrial Spaces</p>
            </div>
            <div className="flex h-[10px] items-center justify-center relative shrink-0 w-[5px]">
              <div className="flex-none rotate-[90deg]">
                <div className="w-[5px] h-[10px] relative">
                  <img alt="" className="block w-full h-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {[imgImg3, imgImg1, imgImg2, imgImg4, imgImg5, imgImg6, imgImg7].map((img, index) => (
              <div key={index} className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                <div className="aspect-[211.667/211.67] bg-[#a6a6a6] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] box-border content-stretch flex gap-[10px] items-start overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundImage: `url('${img}')` }}>
                  <div className="basis-0 content-stretch flex gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                      <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                        <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.12px]">
                          <p className="leading-[normal] whitespace-pre">Populær</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[29px] h-[26px] relative shrink-0">
                      <img alt="" className="block w-full h-full" src={imgLikeIcon} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                  <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-gray-950 text-nowrap tracking-[-0.1px]">
                    <p className="leading-[normal] whitespace-pre">Studio i Aarhus</p>
                  </div>
                  <div className="content-stretch flex font-['Montserrat:Regular',_sans-serif] gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Halv/Hel dags leje</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">•</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Backdrop inkl.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-[112px]">
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">5.000 - 10.000 kr.</p>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">•</p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="w-[7px] h-[7px] relative shrink-0">
                        <img alt="" className="block w-full h-full" src={imgVector1} />
                      </div>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">4,9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category 14 - Aesthetic Spaces */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="font-['Montserrat:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
              <p className="leading-[normal] whitespace-pre">Aesthetic Spaces</p>
            </div>
            <div className="flex h-[10px] items-center justify-center relative shrink-0 w-[5px]">
              <div className="flex-none rotate-[90deg]">
                <div className="w-[5px] h-[10px] relative">
                  <img alt="" className="block w-full h-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {[imgImg8, imgImg9, imgImg10, imgImg11, imgImg12, imgImg13, imgImg14].map((img, index) => (
              <div key={index} className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                <div className="aspect-[211.667/211.67] bg-[#a6a6a6] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] box-border content-stretch flex gap-[10px] items-start overflow-clip p-[12px] relative rounded-[20px] shrink-0 w-full" style={{ backgroundImage: `url('${img}')` }}>
                  <div className="basis-0 content-stretch flex gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                      <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                        <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.12px]">
                          <p className="leading-[normal] whitespace-pre">Populær</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[29px] h-[26px] relative shrink-0">
                      <img alt="" className="block w-full h-full" src={imgLikeIcon} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                  <div className="font-['Montserrat:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-gray-950 text-nowrap tracking-[-0.1px]">
                    <p className="leading-[normal] whitespace-pre">Studio i Aarhus</p>
                  </div>
                  <div className="content-stretch flex font-['Montserrat:Regular',_sans-serif] gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Halv/Hel dags leje</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">•</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="leading-[normal] text-nowrap whitespace-pre">Backdrop inkl.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-[112px]">
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">5.000 - 10.000 kr.</p>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">•</p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <div className="w-[7px] h-[7px] relative shrink-0">
                        <img alt="" className="block w-full h-full" src={imgVector1} />
                      </div>
                    </div>
                    <div className="font-['Montserrat:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#505050] text-[10px] text-nowrap tracking-[-0.1px]">
                      <p className="leading-[normal] whitespace-pre">4,9</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}