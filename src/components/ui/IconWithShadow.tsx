interface IconWithShadowProps {
  icon: string;
  hoverIcon: string;
  label: string;
  href: string;
  className?: string;
}

export function IconWithShadow({ icon, hoverIcon, label, href, className = "" }: IconWithShadowProps) {
  return (
    <a href={href} className={`flex flex-col items-center space-y-2 group ${className}`}>
      <div className="flex flex-col items-center">
        {/* Icon container that moves up on hover */}
        <div className="relative group-hover:-translate-y-1 transition-transform duration-200">
          {/* Default state icon */}
          <img 
            src={icon} 
            alt={label} 
            className="w-12 h-12 group-hover:hidden"
          />
          {/* Hover state icon */}
          <img 
            src={hoverIcon} 
            alt={label} 
            className="w-12 h-12 hidden group-hover:block"
          />
        </div>
      </div>
      {/* Text label pulled close to the shadow */}
      <span className="-mt-1 text-sm text-[#6F6470] group-hover:text-[#EFADFF] transition-colors">
        {label}
      </span>
    </a>
  );
}
