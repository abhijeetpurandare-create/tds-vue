import { ThemeProvider } from '@delhivery/tarmac'
import BuildingFar from '../assets/DesktopDynamicJumbotron/buildingFar.png'
import BuildingNear from '../assets/DesktopDynamicJumbotron/buildingNear.png'
import Vehicle from '../assets/DesktopDynamicJumbotron/vehicle.png'

interface JumbotronProps {
  dateHeading?: string
  date?: string
  header?: JSX.Element
  backgroundColor?: string
  trailColor?: string
  textColor?: string
  ObjectImage?: string
}

const Jumbotron: React.FC<JumbotronProps> = (props) => {
  const {
    dateHeading,
    date,
    header = <></>,
    backgroundColor = 'bg-blue-500',
    trailColor = 'blue-500',
    textColor = 'text-white',
    ObjectImage = Vehicle
  } = props


  const getBgColorClass = () => {

    if (
      backgroundColor &&
      (backgroundColor.startsWith('#') || backgroundColor.startsWith('rgb'))
    ) {
      return ''
    }

    return backgroundColor || 'bg-blue-500'
  }

  const getTextColorClass = () => {
    if (
      textColor &&
      (textColor.startsWith('#') || textColor.startsWith('rgb'))
    ) {
      return ''
    }
    return textColor || 'text-white'
  }

  // CSS animation styles
  const animationStyles = `
    @keyframes marquee {
      from { transform: translateX(0%); }
      to { transform: translateX(-100%); }
    }
    
    @keyframes vehicleMotion {
      from { transform: translateX(0%); }
      to { transform: translateX(60%); }
    }
    
    @keyframes animatePathMotion {
      from { transform: translateX(-100%); }
      to { transform: translateX(-37%); }
    }
  `

  return (
    <ThemeProvider ><div
      className={`${getBgColorClass()} w-full overflow-hidden`}
      style={
        backgroundColor &&
          (backgroundColor.startsWith('#') || backgroundColor.startsWith('rgb'))
          ? { backgroundColor }
          : {}
      }
    >
      <style>{animationStyles}</style>
      {header}
      {/* date section */}
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div
            className={`text-[16px] text-base md:text-lg leading-6 font-normal ${getTextColorClass()}`}
            style={
              textColor &&
                (textColor.startsWith('#') || textColor.startsWith('rgb'))
                ? { color: textColor }
                : {}
            }
          >
            {dateHeading || ''}
          </div>
          <div
            className={`${getTextColorClass()} font-bold text-base leading-7 md:leading-[64px] md:text-[30.2px] text-center`}
            style={
              textColor &&
                (textColor.startsWith('#') || textColor.startsWith('rgb'))
                ? { color: textColor }
                : {}
            }
          >
            {date || ''}
          </div>
        </div>
      </div>
      <div className="relative">
        <div
          className="w-full h-full whitespace-nowrap absolute left-0 bottom-0"
          style={{
            animation: 'marquee 25s linear infinite'
          }}
        >
          <div
            className="w-full h-[55px] bg-contain bg-repeat-x inline-block translate-y-[34px] md:translate-y-[18px]"
            style={{ backgroundImage: `url(${BuildingFar})` }}
          ></div>
          <div
            className="w-full h-[55px] bg-contain bg-repeat-x inline-block translate-y-[34px] md:translate-y-[18px]"
            style={{ backgroundImage: `url(${BuildingFar})` }}
          ></div>
        </div>
        <div
          className="w-full h-full whitespace-nowrap"
          style={{
            animation: 'marquee 15s linear infinite'
          }}
        >
          <div
            className="w-full h-[62px] bg-contain bg-repeat-x inline-block translate-y-[25px] md:translate-y-[8px]"
            style={{ backgroundImage: `url(${BuildingNear})` }}
          ></div>
          <div
            className="w-full h-[62px] bg-contain bg-repeat-x inline-block translate-y-[25px] md:translate-y-[8px]"
            style={{ backgroundImage: `url(${BuildingNear})` }}
          ></div>
        </div>
        <div
          className="absolute left-0 bottom-0 w-full"
          style={{
            animation: 'vehicleMotion 8s linear forwards'
          }}
        >
          <img className="w-[30px] md:w-[55px]" src={ObjectImage} alt="vehicle" />
        </div>
        <div
          className={`w-full h-[3px]`}
          style={{
            background: trailColor && (trailColor.startsWith('#') || trailColor.startsWith('rgb'))
              ? `linear-gradient(to right, ${trailColor} 0%, ${trailColor} 90%, transparent 100%)`
              : `linear-gradient(to right, var(--tw-gradient-stops))`,
            '--tw-gradient-from': trailColor.startsWith('#') || trailColor.startsWith('rgb') ? trailColor : `var(--tw-${trailColor})`,
            '--tw-gradient-to': 'transparent',
            '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-from) 90%, var(--tw-gradient-to)',
            animation: 'animatePathMotion 8s linear forwards'
          }}
        ></div>
      </div>
    </div></ThemeProvider>

  )
}

export default Jumbotron