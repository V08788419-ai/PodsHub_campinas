import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  MessageCircle, 
  Instagram, 
  Truck, 
  CreditCard, 
  Zap, 
  Star, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ShieldAlert,
  CheckCircle2,
  Clock,
  MapPin,
  Menu,
  X
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product } from './constants';

// --- Components ---

const AgeVerification = ({ onConfirm }: { onConfirm: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/95 backdrop-blur-xl p-4"
    >
      <div className="max-w-md w-full bg-brand-gray border border-white/10 rounded-3xl p-8 text-center shadow-2xl glow-orange-border">
        <ShieldAlert className="w-16 h-16 text-brand-orange mx-auto mb-6" />
        <h2 className="text-3xl font-display mb-4 tracking-wider">VERIFICAÇÃO DE IDADE</h2>
        <p className="text-gray-400 mb-8 font-body">
          Este site contém produtos destinados apenas a adultos. Você tem mais de 18 anos?
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onConfirm}
            className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all active:scale-95"
          >
            SIM, TENHO 18+
          </button>
          <button 
            onClick={() => window.location.href = 'https://www.google.com'}
            className="bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-all"
          >
            NÃO
          </button>
        </div>
        <p className="mt-6 text-xs text-gray-500 uppercase tracking-widest">
          Venda proibida para menores de 18 anos.
        </p>
      </div>
    </motion.div>
  );
};

const MusicPlayer = ({ isPlaying, toggle }: { isPlaying: boolean, toggle: () => void }) => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-brand-gray/80 backdrop-blur-md border border-white/10 p-2 pr-4 rounded-full shadow-lg">
      <button 
        onClick={toggle}
        className="w-10 h-10 flex items-center justify-center bg-brand-orange rounded-full text-white shadow-lg hover:scale-110 transition-transform"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
      <div className="overflow-hidden">
        <p className="text-[10px] text-gray-500 uppercase tracking-tighter leading-none">Tocando agora</p>
        <p className="text-xs font-bold whitespace-nowrap animate-pulse">RÜFÜS DU SOL - You Were Right</p>
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const whatsappUrl = `https://wa.me/5519993473362?text=Olá! Gostaria de pedir o ${product.name}. Quais sabores estão disponíveis?`;

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative bg-brand-gray border border-white/5 rounded-2xl overflow-hidden transition-all hover:border-brand-orange/30 glow-orange-border hover:glow-orange-strong"
    >
      {product.isBestSeller && (
        <div className="absolute top-4 left-4 z-10 bg-brand-orange text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Zap size={12} fill="currentColor" /> MAIS VENDIDO
        </div>
      )}
      
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
           <p className="text-xs text-brand-orange font-bold uppercase tracking-widest">Ver Sabores</p>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-display tracking-wide mb-1">{product.name}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-white">R$ {product.price}</span>
          {product.stockCount && product.stockCount < 10 && (
            <span className="text-[10px] text-brand-orange font-bold animate-pulse">
              ⚠️ RESTAM APENAS {product.stockCount} UNID.
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-6">
          {product.flavors.slice(0, 3).map(f => (
            <span key={f} className="text-[9px] bg-white/5 border border-white/10 px-2 py-1 rounded uppercase text-gray-400">
              {f}
            </span>
          ))}
          {product.flavors.length > 3 && (
            <span className="text-[9px] text-gray-500">+{product.flavors.length - 3}</span>
          )}
        </div>

        <div className="grid grid-cols-5 gap-2">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-4 bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <ShoppingCart size={18} /> COMPRAR AGORA
          </a>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center rounded-xl transition-all"
          >
            <MessageCircle size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Audio setup
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Placeholder for Rufus Du Sol
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const handleVerify = () => {
    setIsVerified(true);
    // Start music on user interaction
    setIsMusicPlaying(true);
    audioRef.current?.play().catch(e => console.log("Autoplay blocked", e));
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="relative min-h-screen font-body selection:bg-brand-orange selection:text-white">
      <AnimatePresence>
        {!isVerified && <AgeVerification onConfirm={handleVerify} />}
      </AnimatePresence>

      <MusicPlayer isPlaying={isMusicPlaying} toggle={toggleMusic} />

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/5519993473362" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform glow-orange-border"
      >
        <MessageCircle size={32} fill="currentColor" />
      </a>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-brand-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center shadow-lg glow-orange-border">
              <Zap className="text-white" fill="currentColor" />
            </div>
            <span className="text-2xl font-display tracking-tighter text-white">PODS <span className="text-brand-orange">HUB</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-400">
            <a href="#home" className="hover:text-brand-orange transition-colors">Home</a>
            <a href="#produtos" className="hover:text-brand-orange transition-colors">Produtos</a>
            <a href="#entrega" className="hover:text-brand-orange transition-colors">Entrega</a>
            <a href="#contato" className="hover:text-brand-orange transition-colors">Contato</a>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-brand-dark pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-2xl font-display tracking-widest">
              <a href="#home" onClick={() => setIsMenuOpen(false)}>HOME</a>
              <a href="#produtos" onClick={() => setIsMenuOpen(false)}>PRODUTOS</a>
              <a href="#entrega" onClick={() => setIsMenuOpen(false)}>ENTREGA</a>
              <a href="#contato" onClick={() => setIsMenuOpen(false)}>CONTATO</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[120px] animate-vapor" />
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] animate-vapor" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8"
          >
            <Truck size={16} className="text-brand-orange" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Entrega rápida em Campinas e região</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-display leading-[0.9] mb-6 glow-orange"
          >
            🔥 O <span className="text-brand-orange">MENOR PREÇO</span> DE <br /> CAMPINAS E REGIÃO
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-12"
          >
            Pods originais das melhores marcas. <br />
            Entrega rápida e pagamento fácil. Qualidade premium garantida.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="#produtos" 
              className="w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-white font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl glow-orange-border active:scale-95"
            >
              <ShoppingCart /> COMPRAR AGORA
            </a>
            <a 
              href="https://wa.me/5519993473362" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all border border-white/10"
            >
              <MessageCircle /> PEDIR PELO WHATSAPP
            </a>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 px-6 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-display tracking-wider">🔥 MAIS VENDIDOS</h2>
            <div className="h-px flex-1 bg-white/5 mx-8 hidden md:block" />
            <a href="#produtos" className="text-brand-orange text-sm font-bold flex items-center gap-2 hover:underline">
              VER TODOS <ChevronRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {PRODUCTS.filter(p => p.isBestSeller).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            {/* Add a few more to fill the grid if needed, or just keep the best seller */}
            {PRODUCTS.slice(1, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section id="produtos" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {CATEGORIES.map((category, idx) => (
            <div key={category} className={idx !== 0 ? "mt-24" : ""}>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-2 h-10 bg-brand-orange rounded-full" />
                <h2 className="text-4xl font-display tracking-wider uppercase">{category}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCTS.filter(p => p.category === category).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery Section */}
      <section id="entrega" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-orange/5 z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-brand-gray border border-brand-orange/20 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 glow-orange-border">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-orange/20 rounded-3xl mb-8">
                <Truck className="w-10 h-10 text-brand-orange" />
              </div>
              <h2 className="text-5xl font-display mb-6">🛵 ENTREGA RÁPIDA EM CAMPINAS</h2>
              <p className="text-gray-400 text-xl mb-10">
                Entrega agilizada 🚀 <br />
                Mande seu endereço no WhatsApp e calculamos o frete na hora para você.
              </p>
              <a 
                href="https://wa.me/5519993473362?text=Olá! Gostaria de calcular o frete para meu endereço." 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-brand-orange hover:bg-orange-600 text-white font-bold px-12 py-5 rounded-2xl transition-all shadow-xl active:scale-95"
              >
                <MessageCircle /> CALCULAR FRETE NO WHATSAPP
              </a>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <Clock className="text-brand-orange mb-4" />
                <h4 className="font-bold mb-2">Express</h4>
                <p className="text-xs text-gray-500">Receba em minutos em Campinas.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <MapPin className="text-brand-orange mb-4" />
                <h4 className="font-bold mb-2">Região</h4>
                <p className="text-xs text-gray-500">Atendemos toda a região metropolitana.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <CheckCircle2 className="text-brand-orange mb-4" />
                <h4 className="font-bold mb-2">Original</h4>
                <p className="text-xs text-gray-500">Apenas produtos 100% autênticos.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <Zap className="text-brand-orange mb-4" />
                <h4 className="font-bold mb-2">Preço</h4>
                <p className="text-xs text-gray-500">Garantimos o melhor valor da cidade.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-16 tracking-widest">O QUE DIZEM NOSSOS CLIENTES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Lucas M.", city: "Campinas", text: "Entrega muito rápida, produto original e preço muito melhor que outros lugares." },
              { name: "Gabriel S.", city: "Barão Geraldo", text: "Comprei o Ignite V80 e chegou em menos de 40 minutos. Atendimento top!" },
              { name: "Marina R.", city: "Cambuí", text: "Melhor loja de pods da região. Sempre tem os sabores que eu gosto em estoque." }
            ].map((t, i) => (
              <div key={i} className="bg-brand-gray p-8 rounded-3xl border border-white/5 relative">
                <div className="flex text-brand-orange mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 italic mb-6">"{t.text}"</p>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">{t.city}</p>
                </div>
                <div className="absolute top-8 right-8 text-white/5">
                  <MessageCircle size={48} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 px-6 bg-brand-gray/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-display mb-12 tracking-widest text-gray-400 uppercase">FORMAS DE PAGAMENTO</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <Zap className="text-brand-orange w-10 h-10" fill="currentColor" />
              </div>
              <span className="font-bold">PIX ⚡</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <CreditCard className="text-brand-orange w-10 h-10" />
              </div>
              <span className="font-bold">CRÉDITO 💳</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <CreditCard className="text-brand-orange w-10 h-10" />
              </div>
              <span className="font-bold">DÉBITO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="pt-20 pb-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center shadow-lg">
                  <Zap className="text-white" fill="currentColor" />
                </div>
                <span className="text-3xl font-display tracking-tighter text-white">PODS <span className="text-brand-orange">HUB</span></span>
              </div>
              <p className="text-gray-500 max-w-sm mb-8">
                A melhor loja de pods descartáveis de Campinas e região. Qualidade premium, entrega ultra rápida e o menor preço garantido.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/podshub_campinas" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-orange transition-colors">
                  <Instagram />
                </a>
                <a href="https://wa.me/5519993473362" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-orange transition-colors">
                  <MessageCircle />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display text-xl mb-6 tracking-widest">LINKS ÚTEIS</h4>
              <ul className="flex flex-col gap-4 text-gray-500 text-sm">
                <li><a href="#home" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="#produtos" className="hover:text-white transition-colors">Produtos</a></li>
                <li><a href="#entrega" className="hover:text-white transition-colors">Entrega</a></li>
                <li><a href="https://wa.me/5519993473362" className="hover:text-white transition-colors">WhatsApp</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xl mb-6 tracking-widest">INSTAGRAM</h4>
              <a 
                href="https://instagram.com/podshub_campinas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm"
              >
                <Instagram size={18} /> SIGA A PODS HUB
              </a>
              <p className="mt-4 text-xs text-gray-600">@podshub_campinas</p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-10 text-center">
            <p className="text-xs text-gray-600 uppercase tracking-[0.2em] mb-4">
              © 2024 PODS HUB CAMPINAS - TODOS OS DIREITOS RESERVADOS
            </p>
            <p className="text-[10px] text-gray-700 max-w-2xl mx-auto">
              AVISO: Este produto contém nicotina. A nicotina é uma substância química viciante. Venda proibida para menores de 18 anos. Use com responsabilidade.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
