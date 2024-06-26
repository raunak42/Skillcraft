import { TryAgainButton } from "./TryAgainButton";
import { prisma } from "@/lib/prisma";
import { generateId } from "lucia";

interface Props {
  children: React.ReactNode;
}

export const DbErrorWrapper: React.FC<Props> = async ({ children }) => {
  let showDbError = true;

  try {
    const testCourse = await prisma.course.create({
      data: {
        title: "TESTCOURSE",
        price: 0,
        published: true,
      },
    });

    await prisma.course.deleteMany({
      where: {
        title: testCourse.title,
      },
    });

    showDbError = false;
  } catch (error) {
    console.error(error);
    showDbError = true;
  }

  return (
    <>
      {!showDbError && children}
      {showDbError && (
        <div className="flex items-center justify-center text-4xl font-bold text-white z-50 fixed inset-0 bg-white size-full">
          <div className=" flex flex-col items-center md:flex-row gap-8  ">
            <svg
              width="130px"
              height="130px"
              viewBox="0 0 24.00 24.00"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title>ic_fluent_cellular_off_24_regular</title>
                <desc>Created with Sketch.</desc>
                <g
                  id="🔍-Product-Icons"
                  strokeWidth="0.00024000000000000003"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="ic_fluent_cellular_off_24_regular"
                    fill="#000000"
                    fillRule="nonzero"
                  >
                    <path
                      d="M6.27645243,5.22500888 L20.7718432,19.7209962 C21.0647304,20.0138954 21.0647206,20.4887691 20.7718214,20.7816563 C20.4789221,21.0745435 20.0040484,21.0745337 19.7111612,20.7816345 L16.499,17.569 L16.5,18.25 C16.5,18.6642136 16.1642136,19 15.75,19 C15.3703042,19 15.056509,18.7178461 15.0068466,18.3517706 L15,18.25 L14.999,16.069 L12.499,13.569 L12.5,18.25 C12.5,18.6642136 12.1642136,19 11.75,19 C11.3703042,19 11.056509,18.7178461 11.0068466,18.3517706 L11,18.25 L10.999,12.069 L5.21577044,6.28564722 C4.92288325,5.99274798 4.92289302,5.51787424 5.21579226,5.22498705 C5.50869151,4.93209986 5.98356524,4.93210963 6.27645243,5.22500888 Z M3.75,16 C4.12969577,16 4.44349096,16.2821539 4.49315338,16.6482294 L4.5,16.75 L4.5,18.25 C4.5,18.6642136 4.16421356,19 3.75,19 C3.37030423,19 3.05650904,18.7178461 3.00684662,18.3517706 L3,18.25 L3,16.75 C3,16.3357864 3.33578644,16 3.75,16 Z M7.75,13 C8.12969577,13 8.44349096,13.2821539 8.49315338,13.6482294 L8.5,13.75 L8.5,18.2487201 C8.5,18.6629337 8.16421356,18.9987201 7.75,18.9987201 C7.37030423,18.9987201 7.05650904,18.7165662 7.00684662,18.3504907 L7,18.2487201 L7,13.75 C7,13.3357864 7.33578644,13 7.75,13 Z M19.742726,4 C20.1224039,3.99635605 20.4389211,4.27522768 20.492132,4.64050924 L20.4999655,4.74212651 L20.499,17.443 L19,15.943 L19.000036,4.75666426 C18.9960183,4.3428045 19.3285319,4.00405049 19.742726,4 Z M15.75,7 C16.1296958,7 16.443491,7.28215388 16.4931534,7.64822944 L16.5,7.75 L16.5,13.443 L15,11.942 L15,7.75 C15,7.33578644 15.3357864,7 15.75,7 Z"
                      id="🎨-Color"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            <div className="flex flex-col gap-2 justify-center items-center md:items-start  ">
              <h1 className="text-black text-xl text-center ">
                Connect to the internet.
              </h1>
              <div className="flex flex-row items-center justify-center  ">
                <div className="text-black text-sm font-thin text-center">
                  You're offline. Check your connection and try again.
                </div>
              </div>

              <TryAgainButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
