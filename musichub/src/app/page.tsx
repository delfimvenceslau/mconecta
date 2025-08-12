import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      <Header />

      <main>
        {/* Hero Section - Artista em Destaque */}
        <section className="relative h-screen">
          <div className="absolute inset-0 hero-image flex items-end pb-20">
            <div className="container mx-auto px-10">
              <h2 className="text-5xl font-bold mb-4">LUA SANTANA</h2>
              <div className="flex mb-4 space-x-3">
                <span className="genre-tag bg-gray-800 px-3 py-1 rounded-full text-sm cursor-pointer">POP</span>
                <span className="genre-tag bg-gray-800 px-3 py-1 rounded-full text-sm cursor-pointer">MPB</span>
                <span className="genre-tag bg-gray-800 px-3 py-1 rounded-full text-sm cursor-pointer">ELETRÔNICO</span>
              </div>
              <p className="text-xl max-w-2xl mb-6">Artista premiada com mais de 10 milhões de streams. Disponível para shows privados, festivais e eventos corporativos.</p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-black px-4 sm:px-6 py-2 rounded flex items-center justify-center hover:bg-opacity-80 w-full sm:w-auto">
                  <i className="fas fa-play mr-2"></i>
                  <span className="text-sm sm:text-base">Ver Performance</span>
                </button>
                <button className="bg-gray-600 bg-opacity-70 px-4 sm:px-6 py-2 rounded flex items-center justify-center hover:bg-opacity-50 w-full sm:w-auto">
                  <i className="fas fa-calendar-alt mr-2"></i>
                  <span className="text-sm sm:text-base">Ver Disponibilidade</span>
                </button>
              </div>
            </div>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Artista musical em destaque"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </section>

        {/* Seção de Artistas */}
        <section className="py-16 px-10 mt-10">
          <div className="container mx-auto">
            <h3 className="text-2xl font-bold mb-6">Artistas em Alta</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Artists will be dynamically loaded here */}
            </div>
          </div>
        </section>

        {/* Seção por Gêneros */}
        <section className="py-16 px-4 sm:px-10 ">
          <div className="container mx-auto">
            <h3 className="text-2xl font-bold mb-6">Explore por Gênero</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {/* Genres will be dynamically loaded here */}
            </div>
          </div>
        </section>

        {/* Seção de Shows Recentes */}
        <section className="py-16 px-4 sm:px-10 ">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
                Por que contratar artistas pela nossa plataforma?
              </h3>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">Conectamos você aos melhores talentos musicais com segurança, praticidade e excelência</p>
            </div>
            {/* Benefits grid */}
          </div>
        </section>
      </main>

      <Footer />

    </div>
  )
}
