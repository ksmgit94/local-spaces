import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#F8DEFF] border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Support */}
          <div>
            <h3 className="font-headline text-headline tracking-headline mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/help" className="hover:text-gray-900 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-gray-900 transition-colors">
                  Safety
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-gray-900 transition-colors">
                  Cancellation options
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-gray-900 transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-headline text-headline tracking-headline mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/disaster-relief" className="hover:text-gray-900 transition-colors">
                  Disaster relief
                </Link>
              </li>
              <li>
                <Link href="/support-refugees" className="hover:text-gray-900 transition-colors">
                  Support refugees
                </Link>
              </li>
              <li>
                <Link href="/combating-discrimination" className="hover:text-gray-900 transition-colors">
                  Combating discrimination
                </Link>
              </li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="font-headline text-headline tracking-headline mb-4">Hosting</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/become-a-host" className="hover:text-gray-900 transition-colors">
                  Become a Host
                </Link>
              </li>
              <li>
                <Link href="/hosting-resources" className="hover:text-gray-900 transition-colors">
                  Hosting resources
                </Link>
              </li>
              <li>
                <Link href="/community-forum" className="hover:text-gray-900 transition-colors">
                  Community forum
                </Link>
              </li>
              <li>
                <Link href="/hosting-responsibly" className="hover:text-gray-900 transition-colors">
                  Hosting responsibly
                </Link>
              </li>
            </ul>
          </div>

          {/* LocalSpaces */}
          <div>
            <h3 className="font-headline text-headline tracking-headline mb-4">LocalSpaces</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/newsroom" className="hover:text-gray-900 transition-colors">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="/new-features" className="hover:text-gray-900 transition-colors">
                  New features
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-gray-900 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/investors" className="hover:text-gray-900 transition-colors">
                  Investors
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4 md:mb-0">
            <span>© 2024 LocalSpaces, Inc.</span>
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">
              Terms
            </Link>
            <Link href="/sitemap" className="hover:text-gray-900 transition-colors">
              Sitemap
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <span>English (US)</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <span>€ EUR</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
