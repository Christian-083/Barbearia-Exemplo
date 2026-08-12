import React, { useMemo } from 'react';
import { Sparkles, MessageCircle, AlertTriangle, TrendingUp, Calendar, Zap, Clock, UserX, Package } from 'lucide-react';
import { Booking, CustomerProfile, CustomerSubscription } from '../../types';
import { buildWhatsAppLink } from '../../utils/whatsapp';
import { WHITELABEL_CONFIG } from '../../config/whitelabel';
import { getProducts } from '../../utils/storage';

interface VirtualManagerInsightsProps {
  bookings: Booking[];
  profiles: CustomerProfile[];
  subscriptions: CustomerSubscription[];
}

export const VirtualManagerInsights: React.FC<VirtualManagerInsightsProps> = ({
  bookings,
  profiles,
  subscriptions,
}) => {
  const products = useMemo(() => getProducts(), []);

  // Low Stock Rule: notify when high-demand products have <= 3 items
  const lowStockProducts = useMemo(() => {
    return products.filter((p) => p.stock <= (p.minStock || 3));
  }, [products]);
  // 1. Inactive Customers (not visited in last 30 days)
  const inactiveCustomers = useMemo(() => {
    return profiles.filter((p) => {
      if (!p.lastVisit) return true;
      const parts = p.lastVisit.split('/');
      if (parts.length === 3) {
        const lastDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
        const diffDays = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays >= 30;
      }
      return false;
    });
  }, [profiles]);

  // 2. Pending Confirmations
  const pendingBookings = useMemo(() => {
    return bookings.filter((b) => b.status === 'pending');
  }, [bookings]);

  // 3. Subscriptions Expiring or Low Balance
  const expiringSubscriptions = useMemo(() => {
    return subscriptions.filter(
      (s) => s.status === 'expiring' || s.remainingCuts === 1 || s.status === 'expired'
    );
  }, [subscriptions]);

  // Actions
  const handleBulkWinbackWA = () => {
    if (inactiveCustomers.length === 0) return;
    const target = inactiveCustomers[0];
    const message = `✂️ *SAUDADES DA BARBEARIA ${WHITELABEL_CONFIG.shortName.toUpperCase()}!* ✂️
Olá *${target.name}*! Notamos que já faz mais de 30 dias desde o seu último corte com a gente. 💈

Temos uma *oferta exclusiva de retorno* pra você essa semana:
🎁 *15% OFF* no seu próximo agendamento!

Garanta seu horário sem fila direto no nosso site:
https://barbearia.app

Te esperamos! 🤝`;

    window.open(buildWhatsAppLink(target.phone, message), '_blank');
  };

  const handleFlashPromoWA = () => {
    const message = `⚡ *PROMOÇÃO RELÂMPAGO DO DIA - ${WHITELABEL_CONFIG.shortName.toUpperCase()}* ⚡

Ainda temos alguns *horários livres para hoje*! ⏰

Agende seu Cabelo ou Barba nas próximas 2 horas e ganhe uma *Cerveja Artesanal / Bebida de cortesia* na cadeira! 🍺✂️

Reserve em 10 segundos pelo site:
https://barbearia.app`;

    window.open(buildWhatsAppLink(WHITELABEL_CONFIG.phone, message), '_blank');
  };

  const handleRenewalWA = (sub: CustomerSubscription) => {
    const message = `👑 *RENOVAÇÃO VIP ${WHITELABEL_CONFIG.shortName.toUpperCase()}* 👑
Olá *${sub.customerName}*!

Seu plano *${sub.planName}* está ${sub.status === 'expired' ? 'expirado' : sub.remainingCuts === 0 ? 'esgotado' : 'renovando em breve'}.

Para continuar com cortes ilimitados sem filas, renove seu plano VIP via PIX em instantes! 💳

Fale conosco para renovar! 🤝`;

    window.open(buildWhatsAppLink(sub.customerPhone, message), '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-card via-card/90 to-primary/10 border border-primary/30 p-5 rounded-3xl space-y-4 shadow-[0_0_30px_-10px_hsl(45_97%_54%/0.15)] relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-primary text-black font-bold shadow-[0_0_15px_hsl(45_97%_54%/0.5)] animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-foreground tracking-tight flex items-center gap-2">
              Gerente Virtual Inteligente
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                IA Ativa
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Análise automatizada de faturamento, retenção de clientes e retenção da agenda em tempo real.
            </p>
          </div>
        </div>
      </div>

      {/* Low Stock Alert Rule Banner */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs animate-pulse">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-destructive text-white font-extrabold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-destructive font-extrabold text-sm block">
                ⚠️ Alerta de Estoque Crítico ({lowStockProducts.length} produto(s) &lt; 3 un.)
              </strong>
              <p className="text-muted-foreground mt-0.5">
                Os produtos <strong className="text-foreground">{lowStockProducts.map((p) => `${p.name} (${p.stock} un.)`).join(', ')}</strong> atingiram o limite mínimo de estoque.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const p = lowStockProducts[0];
              const msg = `📦 *PEDIDO URGENTE DE REPOSIÇÃO - ${WHITELABEL_CONFIG.shortName.toUpperCase()}* 📦
Olá ${p.supplier || 'Fornecedor'}!
Nosso produto *${p.name}* está com apenas *${p.stock} unidades* em estoque (Abaixo de 3 unidades).
Solicito envio urgente de +20 unidades. Favor responder com prazo e PIX. Obrigado!`;
              window.open(buildWhatsAppLink(WHITELABEL_CONFIG.phone, msg), '_blank');
            }}
            className="px-4 py-2 bg-destructive text-white rounded-xl font-extrabold text-xs hover:bg-destructive/90 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-md shrink-0"
          >
            <MessageCircle className="w-4 h-4" /> Enviar Pedido ao Fornecedor
          </button>
        </div>
      )}

      {/* Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Insight 1: Inactive Customers */}
        <div className="bg-background/60 backdrop-blur-md p-4 rounded-2xl border border-border flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-400 flex items-center gap-1">
                <UserX className="w-3.5 h-3.5" /> Retenção de Clientes
              </span>
              <span className="text-xs font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                {inactiveCustomers.length} Inativos
              </span>
            </div>
            <h4 className="font-extrabold text-xs text-foreground mt-2">
              {inactiveCustomers.length > 0
                ? `${inactiveCustomers.length} clientes não voltam há 30+ dias!`
                : 'Sua base de clientes está engajada e frequente!'}
            </h4>
            <p className="text-[11px] text-muted-foreground mt-1">
              {inactiveCustomers.length > 0
                ? `Ex: ${inactiveCustomers[0]?.name}. Envie uma oferta de retorno com cupom para recuperar receita.`
                : 'Nenhum cliente sumido detectado neste período.'}
            </p>
          </div>

          {inactiveCustomers.length > 0 && (
            <button
              onClick={handleBulkWinbackWA}
              className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Disparar WA de Retorno
            </button>
          )}
        </div>

        {/* Insight 2: Flash Promo for Free Slots */}
        <div className="bg-background/60 backdrop-blur-md p-4 rounded-2xl border border-border flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-primary flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Ocupação da Agenda
              </span>
              <span className="text-xs font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                Oportunidade
              </span>
            </div>
            <h4 className="font-extrabold text-xs text-foreground mt-2">
              Promova horários ociosos para hoje
            </h4>
            <p className="text-[11px] text-muted-foreground mt-1">
              Crie uma promoção relâmpago de 1-clique nos seus Status do WhatsApp para preencher lacunas na tarde.
            </p>
          </div>

          <button
            onClick={handleFlashPromoWA}
            className="w-full py-2 bg-primary text-black rounded-xl font-extrabold text-xs transition-all hover:bg-primary/90 cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_12px_-2px_hsl(45_97%_54%/0.4)]"
          >
            <Zap className="w-3.5 h-3.5" /> Promo Relâmpago WA
          </button>
        </div>

        {/* Insight 3: Pending VIP Renewals or Agendamentos */}
        <div className="bg-background/60 backdrop-blur-md p-4 rounded-2xl border border-border flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Recorrência VIP
              </span>
              <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                {expiringSubscriptions.length} VIPs
              </span>
            </div>
            <h4 className="font-extrabold text-xs text-foreground mt-2">
              {expiringSubscriptions.length > 0
                ? `${expiringSubscriptions.length} mensalistas perto de renovar`
                : 'Todas as assinaturas recorrentes estão ativas'}
            </h4>
            <p className="text-[11px] text-muted-foreground mt-1">
              {expiringSubscriptions.length > 0
                ? `Ex: ${expiringSubscriptions[0]?.customerName} (${expiringSubscriptions[0]?.remainingCuts} cortes restantes).`
                : 'Mantenha a receita recorrente garantida todos os meses.'}
            </p>
          </div>

          {expiringSubscriptions.length > 0 ? (
            <button
              onClick={() => handleRenewalWA(expiringSubscriptions[0])}
              className="w-full py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Notificar Renovação
            </button>
          ) : (
            <div className="text-[11px] text-emerald-400 font-bold py-1 text-center bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              ✓ Fluxo de Assinaturas Estável
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
