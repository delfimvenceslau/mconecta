import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black py-12 px-10 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-red-600 font-bold text-xl mb-4">MUSICHUB</h4>
            <p className="text-gray-400">A plataforma líder para contratação de artistas musicais para todos os tipos de eventos.</p>
          </div>
          <div>
            <h5 className="font-bold mb-4">NAVEGAÇÃO</h5>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white">Início</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-white">Artistas</Link></li>
              <li><Link href="/genres" className="text-gray-400 hover:text-white">Gêneros</Link></li>
              <li><Link href="/shows" className="text-gray-400 hover:text-white">Shows</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">SUPORTE</h5>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-400 hover:text-white">Central de Ajuda</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Termos de Uso</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Política de Privacidade</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">REDES SOCIAIS</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-2xl"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl"><i className="fab fa-tiktok"></i></a>
            </div>
            <div className="mt-6">
              <Link href="/signup" className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 w-full block text-center">
                CADASTRE-SE GRÁTIS
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© 2023 MusicHub. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
