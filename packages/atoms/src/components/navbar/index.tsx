import { useState } from 'react'

type headerConfigType = {
  title: string
  url?: string
  isButton?: boolean
  icon?: JSX.Element
  subTitles: {
    text: string
    url: string
    icon?: JSX.Element
  }[]
}[]

interface NavbarProps {
  headerConfig: headerConfigType
}

const Navbar: React.FC<NavbarProps> = ({ headerConfig }) => {
  const [showSubmenuTitle, setShowSubmenuTitle] = useState('')
  const [showLogout, setShowLogout] = useState(false)

  const arrowBaseStyles = `absolute w-0 h-0 border-solid`


  const handleMouseEnter = (title: string) => {
    setShowSubmenuTitle(title)
  }

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setShowSubmenuTitle('')
  }

  function getInitials(fullName: string): string {
    if (!fullName?.trim()) return ''
    const names = fullName?.trim()?.split(' ')
    const firstInitial = names[0][0]

    if (names.length > 1) {
      const lastInitial = names[names?.length - 1][0]
      return firstInitial + lastInitial
    }
    return firstInitial
  }

  const handleLogout = async () => {
  }

  return (
    <div className="items-center mr-3 hidden lg:flex">
      {headerConfig.map((header) => {
        return (
          <div
            key={header.title}
            className="flex items-center relative"
            onMouseEnter={() => handleMouseEnter(header.title)}
            onMouseLeave={handleMouseLeave}
          >
            {header?.isButton ? (
              <button className="bg-white text-base border border-white text-black flex items-center justify-center gap-3 font-semibold px-5 p-2.5 2xl:py-2.5 2xl:px-5 rounded-[3px] ml-5">
                {header.title}
                <img
                  className={`transition-transform duration-300 ${
                    showSubmenuTitle === 'Ship Now' ? 'rotate-180' : ''
                  }`}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAYAAAA7KqwyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD4SURBVHgBnVBBTsMwEJy1nVuR8gN4QrgWKiVEvfeI2iLRH9CXwA/SU8WtvIBEQkIc+4PyhBzg5KzNmipSBZYQnYut9czseJDnkxRHImgVm5PdqJxV+CdG45uKzWBHF1ezO6XonoCt6kzRNKv2r63ODGoPZA5+Sd9u5XwiRwVFrbW2eGse3+Pi6zNOkhrOp/Bu+fK8XlH/OMynmda0gVKImRyKmV3x2qy3Ya56Qhho5gLOIRHicDzNDs33YgfL3XkvDqBoTK1rEElMLAAWlqkkcmtlwc9kFP/rbcqm24TrnuSl4E8p+OlXwVGDHpfl/EEIp5o/FjFxwBd1YHDaoHSd8gAAAABJRU5ErkJggg=="
                  alt="arrow"
                />
              </button>
            ) : (
              <a
                href={header.url}
                className="text-white cursor-pointer py-[0.25rem] px-[0.625rem] 2xl:py-3 2xl:px-[20px] text-lg"
              >
                {header.title}
              </a>
            )}
            {showSubmenuTitle === header.title && (
              <>
                {!header?.isButton && (
                  <div className="bg-delhivery-red min-h-[4px] w-[2rem] absolute left-3 top-8 2xl:top-[38px] 2xl:left-5 z-20"></div>
                )}
                {header.subTitles.length > 0 && (
                  <>
                    <div
                      className={`flex items-center flex-col absolute z-10 ${
                        header?.isButton
                          ? 'top-[46px] right-0'
                          : 'top-9 2xl:top-10 2xl:left-4'
                      }`}
                    >
                      <div className="w-full h-4 bg-black"></div>
                      <div
                        className={arrowBaseStyles}
                        style={{
                          borderColor: `transparent transparent white transparent`,
                          borderWidth: '0 6px 6px 6px',
                          top: '10px',
                          transform: 'translateX(-50%)',
                          left: header?.isButton ? '200px' : '20px',
                        }}
                      />
                      <div className="bg-white rounded-[6px] w-max shadow-lg py-2">
                        {header.subTitles.map((subTitle) => {
                          const icon = subTitle?.icon
                          return (
                            <a
                              href={subTitle.url}
                              key={subTitle.text}
                              className="flex py-3 px-6 pr-8 items-center gap-[10px] hover:bg-[#e0e3ea]"
                            >
                              {icon}
                              <span>{subTitle.text}</span>
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )
      })}
      {/* {userName && (
        <div
          className="w-[45px] h-[45px] bg-delhivery-red text-white rounded-full flex items-center justify-center ml-[26px] cursor-pointer relative"
          onClick={() => {
            setShowLogout(!showLogout)
          }}
        >
          {getInitials(userName)}
          {showLogout && (
            <div
              onClick={handleLogout}
              className="flex items-center justify-center gap-4 absolute top-[130%] right-0 w-[150px] h-[50px] bg-white rounded-[6px] px-4 py-2 text-black"
            >
              <Icon.arrowRightFromLine />
              <p>Log out</p>
            </div>
          )}
        </div>
      )} */}
    </div>
  )
}

export default Navbar
