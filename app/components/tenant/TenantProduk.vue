<script setup lang="ts">
import { ref } from 'vue'

// Kategori Filter
const categories = ['Semua', 'Makanan & Minuman', 'Kerajinan', 'Pertanian']
const activeCategory = ref('Semua')

// Data Produk Lengkap dengan Rating dan Status Penjualan
const produkList = [
  { 
    id: 1, 
    name: 'Kopi Arabika Gayo Premium 250gr', 
    price: 'Rp 65.000', 
    seller: 'UKM Kopi Maju', 
    category: 'Makanan & Minuman',
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600&q=80',
    rating: 4.9,
    sold: 128,
    badge: 'Terlaris'
  },
  { 
    id: 2, 
    name: 'Madu Hutan Liar Asli 500ml', 
    price: 'Rp 120.000', 
    seller: 'Kelompok Tani Lebah', 
    category: 'Makanan & Minuman',
    image: 'https://images.unsplash.com/photo-1587049352847-4d455951d6bb?w=600&q=80',
    rating: 4.8,
    sold: 85,
    badge: ''
  },
  { 
    id: 3, 
    name: 'Kain Tenun Ikat Tradisional NTT', 
    price: 'Rp 350.000', 
    seller: 'Koperasi Tenun', 
    category: 'Kerajinan',
    image: 'https://images.unsplash.com/photo-1605000527375-1014e7a275ba?w=600&q=80',
    rating: 5.0,
    sold: 24,
    badge: 'Produk Baru'
  },
  { 
    id: 4, 
    name: 'Keripik Pisang Coklat Lumer', 
    price: 'Rp 15.000', 
    seller: 'Ibu Ratna', 
    category: 'Makanan & Minuman',
    image: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=600&q=80',
    rating: 4.7,
    sold: 340,
    badge: 'Promo'
  },
]
</script>

<template>
  <section class="py-24 bg-white relative overflow-hidden">
    
    <div class="absolute top-[20%] left-[-15%] w-[40rem] h-[40rem] bg-rose-50/60 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="container mx-auto px-4 lg:max-w-7xl relative z-10">
      
      <div class="text-center mb-12 max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold mb-4 shadow-sm">
          <UIcon name="i-lucide-shopping-bag" class="w-4 h-4 text-red-500" /> 
          Etalase Anggota
        </div>
        <h2 class="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Produk <span class="text-red-600">Unggulan Kami</span>
        </h2>
        <p class="text-lg text-slate-500 mt-4 leading-relaxed">
          Dukung pertumbuhan ekonomi kerakyatan dengan membeli produk-produk berkualitas langsung dari anggota koperasi.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
        <button 
          v-for="kategori in categories" 
          :key="kategori"
          @click="activeCategory = kategori"
          :class="[
            'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm active:scale-95',
            activeCategory === kategori 
              ? 'bg-red-600 text-white shadow-red-600/30' 
              : 'bg-white border border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50'
          ]"
        >
          {{ kategori }}
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        
        <div 
          v-for="produk in produkList" 
          :key="produk.id" 
          class="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:border-red-100 transition-all duration-500"
        >
          <div class="relative w-full aspect-[4/5] bg-slate-50 overflow-hidden cursor-pointer">
            <img 
              :src="produk.image" 
              :alt="produk.name" 
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            
            <div v-if="produk.badge" class="absolute top-4 left-4 z-20">
              <span :class="[
                'px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full shadow-sm',
                produk.badge === 'Terlaris' ? 'bg-amber-400 text-amber-950' : 
                produk.badge === 'Promo' ? 'bg-red-500 text-white' : 'bg-slate-900 text-white'
              ]">
                {{ produk.badge }}
              </span>
            </div>

            <div class="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <button class="w-full bg-white/95 backdrop-blur-sm text-red-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:text-white shadow-lg">
                <UIcon name="i-lucide-shopping-cart" class="w-5 h-5" />
                Beli Sekarang
              </button>
            </div>
          </div>

          <div class="p-6 flex flex-col flex-grow bg-white">
            
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-semibold text-slate-500 flex items-center gap-1.5 hover:text-red-600 cursor-pointer transition-colors">
                <UIcon name="i-lucide-store" class="w-3.5 h-3.5" /> {{ produk.seller }}
              </span>
              <div class="flex items-center gap-1 text-amber-400">
                <UIcon name="i-lucide-star" class="w-3.5 h-3.5 fill-current" />
                <span class="text-[11px] font-bold text-slate-600">{{ produk.rating }}</span>
              </div>
            </div>
            
            <h3 class="font-bold text-slate-800 text-base mb-1 line-clamp-2 leading-snug group-hover:text-red-600 cursor-pointer transition-colors">
              {{ produk.name }}
            </h3>
            
            <p class="text-[11px] text-slate-400 mb-4">Terjual {{ produk.sold }}+</p>
            
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <span class="font-extrabold text-xl text-red-600 tracking-tight">{{ produk.price }}</span>
              <button class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors">
                <UIcon name="i-lucide-heart" class="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
      
      <div class="text-center mt-16">
        <UButton variant="outline" color="gray" size="xl" class="rounded-full px-10 font-bold bg-white hover:bg-slate-50 border-slate-200 text-slate-700 transition-all active:scale-95 shadow-sm">
          Jelajahi Semua Produk <UIcon name="i-lucide-arrow-right" class="ml-2" />
        </UButton>
      </div>

    </div>
  </section>
</template>