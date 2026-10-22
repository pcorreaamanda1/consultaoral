import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  MessageCircle, Award, Users, Stethoscope, Cpu, HeartHandshake, UserCheck, ShieldCheck,
  MapPin, Accessibility, ChevronLeft, ChevronRight, Instagram, CreditCard, Banknote, QrCode,
} from "lucide-react";
import logo from "@/assets/logo_consultaoral.jpeg.asset.json";
import hero from "@/assets/Procedimento_facial_em_clinica_moderna.png.asset.json";
import c1 from "@/assets/consultorio.jpeg.asset.json";
import c2 from "@/assets/consultorio_2.jpeg.asset.json";
import r1 from "@/assets/recepcao_consulta_oral.jpeg.asset.json";
import r3 from "@/assets/recepcao_consulta_oral_3.jpeg.asset.json";
import casoOrtodontia from "@/assets/caso_ortodontia.jpeg.asset.json";
import casoHarmonizacao from "@/assets/caso_harmonizacao.jpeg.asset.json";
import casoReabilitacao from "@/assets/caso_reabilitacao.jpeg.asset.json";
import vitor from "@/assets/dr_vitor.jpeg.asset.json";
import amanda from "@/assets/dra_amanda.jpeg.asset.json";
import vivian from "@/assets/dra_vivian.jpeg.asset.json";
import av1 from "@/assets/avaliacao_1.png.asset.json";
import av2 from "@/assets/avaliacao_2.png.asset.json";
import av3 from "@/assets/avaliacao_3.png.asset.json";
import av4 from "@/assets/avaliacao_4.png.asset.json";
import av5 from "@/assets/avaliacao_5.png.asset.json";
import av6 from "@/assets/avaliacao_6.png.asset.json";
import av7 from "@/assets/avaliacao_7.png.asset.json";
import av8 from "@/assets/avaliacao_8.png.asset.json";
import av9 from "@/assets/avaliacao_9.png.asset.json";

const WA = "https://wa.me/5527998429696?text=" + encodeURIComponent("Olá! Gostaria de agendar uma avaliação na ConsultaOral.");
const IG = "https://instagram.com/consultaoral";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ConsultaOral — Odontologia Especializada em Vila Velha" },
      { name: "description", content: "Clínica odontológica com +30 anos de prática: ortodontia, implantes, harmonização facial e estética do sorriso na Praia de Itaparica." },
      { property: "og:title", content: "ConsultaOral — Odontologia Especializada" },
      { property: "og:description", content: "Tradição, inovação e olhar humano para o seu sorriso em Vila Velha - ES." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function WaButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a href={WA} target="_blank" rel="noopener noreferrer"
      className={`btn-cta inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold tracking-wide ${className}`}>
      <MessageCircle className="h-5 w-5 shrink-0" />{children}
    </a>
  );
}

function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean | undefined }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] ${dark ? "text-sky" : "text-sky"}`}>
      <span className="h-px w-6 bg-sky" />{children}
    </span>
  );
}

function SectionHead({ eyebrow, title, sub, dark }: { eyebrow: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 text-3xl leading-tight font-semibold sm:text-5xl ${dark ? "on-dark" : "text-navy"}`}>{title}</h2>
      {sub && <p className={`mt-4 text-base font-light ${dark ? "on-dark-muted" : "text-muted-foreground"}`}>{sub}</p>}
    </div>
  );
}

function Carousel({ children, auto = 0, label, nav = true }: { children: ReactNode[]; auto?: number; label: string; nav?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const go = (n: number) => {
    const el = ref.current; if (!el) return;
    const idx = (n + children.length) % children.length;
    const child = el.children[idx] as HTMLElement;
    el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const on = () => {
      const w = (el.children[0] as HTMLElement)?.offsetWidth || 1;
      setI(Math.round(el.scrollLeft / w));
    };
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => go(i + 1), auto);
    return () => clearInterval(t);
  });
  return (
    <div aria-label={label}>
      <div ref={ref} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth">
        {children}
      </div>
      {nav && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <button aria-label="Anterior" onClick={() => go(i - 1)} className="rounded-full border border-border p-2 text-navy"><ChevronLeft className="h-4 w-4" /></button>
          <div className="flex gap-2">
            {children.map((_, k) => (
              <button key={k} aria-label={`Ir para ${k + 1}`} onClick={() => go(k)}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-navy" : "w-1.5 bg-sky/50"}`} />
            ))}
          </div>
          <button aria-label="Próximo" onClick={() => go(i + 1)} className="rounded-full border border-border p-2 text-navy"><ChevronRight className="h-4 w-4" /></button>
        </div>
      )}
    </div>
  );
}

const stats = [
  { icon: Award, n: "+30", t: "Anos de prática clínica" },
  { icon: Users, n: "+10.000", t: "Pacientes atendidos" },
  { icon: Stethoscope, n: "3", t: "Especialistas integrados no mesmo espaço" },
  { icon: Cpu, n: "Alto", t: "Padrão tecnológico na estrutura" },
];

const pillars = [
  { icon: HeartHandshake, t: "Ambiente Acolhedor", d: "Estrutura planejada para o seu conforto do início ao fim, oferecendo agilidade nos exames sem precisar sair do consultório e acessibilidade." },
  { icon: UserCheck, t: "Cuidado Individualizado", d: "Plano de tratamento sob medida para suas necessidades reais." },
  { icon: ShieldCheck, t: "Segurança Clínica", d: "Protocolos rigorosos e mais de três décadas de conduta ética." },
  { icon: Cpu, t: "Odontologia Contemporânea", d: "Recursos digitais que tornam os diagnósticos e procedimentos mais rápidos e precisos." },
];

const team = [
  { img: vitor.url, n: "Dr. Victor Nimrichter Jr", r: "Fundador & Cirurgião-Dentista | CRO-ES 7648", h: "+30 Anos de Experiência", d: "Liderança clínica pautada pela ética e precisão técnica. Dedicado à reabilitação oral, implantodontia e à consolidação de uma prática odontológica segura e acolhedora." },
  { img: amanda.url, n: "Dra. Amanda Nimrichter", r: "Ortodontia e Ortopedia dos Maxilares | CRO-ES 9183", h: "Alinhadores Invisíveis & Ortodontia Contemporânea", d: "Especialista no alinhamento funcional e estético do sorriso. Atua com técnicas modernas, desde aparelhos convencionais aos alinhadores invisíveis para crianças, jovens e adultos." },
  { img: vivian.url, n: "Dra. Vívian Nimrichter", r: "Harmonização Facial | CRO-ES 11195", h: "Estética Orofacial Integrada", d: "Atuação focada em realçar a beleza natural, simetria e rejuvenescimento facial através de procedimentos seguros, minimamente invasivos e personalizados." },
];

const services = [
  { t: "Ortodontia & Alinhadores Invisíveis", d: "Correção postural e alinhamento dos dentes com discrição e previsibilidade." },
  { t: "Harmonização Facial", d: "Procedimentos estéticos orofaciais para equilíbrio, simetria e rejuvenescimento." },
  { t: "Implantes Dentários & Cirurgias", d: "Recuperação da função mastigatória e da estética com técnicas seguras." },
  { t: "Estética do Sorriso", d: "Lentes de contato, facetas de porcelana, coroas e clareamento dental." },
  { t: "Dentística Restauradora & Endodontia", d: "Tratamentos de canal e restaurações focadas na preservação do dente natural." },
  { t: "Próteses Dentárias", d: "Soluções fixas e removíveis planejadas para o seu conforto." },
  { t: "Periodontia & Prevenção", d: "Tratamento de gengiva, limpeza profilática e acompanhamento preventivo." },
  { t: "Placas para Bruxismo & Laserterapia", d: "Alívio de dores articulares, proteção contra o desgaste dentário e tratamentos complementares." },
];

const cases = [
  { img: casoOrtodontia.url, t: "Ortodontia", d: "Alinhamento funcional e estético com aparelhos e alinhadores invisíveis." },
  { img: casoHarmonizacao.url, t: "Harmonização Facial", d: "Equilíbrio e naturalidade com procedimentos minimamente invasivos." },
  { img: casoReabilitacao.url, t: "Reabilitação Oral", d: "Implantes e próteses para devolver função e estética ao sorriso." },
];

const reviews = [
  { img: av1.url, n: "Roseli" },
  { img: av2.url, n: "Gabriella" },
  { img: av3.url, n: "Maria Inês" },
  { img: av4.url, n: "Renzo" },
  { img: av5.url, n: "Karina" },
  { img: av6.url, n: "Maria Aparecida" },
  { img: av7.url, n: "João" },
  { img: av8.url, n: "Priscila" },
  { img: av9.url, n: "Marina" },
];

const steps = [
  { t: "Primeira Consulta & Exame Clínico", d: "Coleta detalhada do histórico de saúde e avaliação clínica, com exames caso seja necessário." },
  { t: "Planejamento Integrado", d: "Discussão do caso entre nossos especialistas para definir a melhor conduta terapêutica." },
  { t: "Tratamento & Acompanhamento", d: "Execução do plano com foco na sua tranquilidade, previsibilidade e resultados duradouros." },
];

function Index() {
  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="glass mx-3 mt-3 flex items-center justify-between rounded-full bg-navy-deep/70 py-2 pr-2 pl-3 sm:mx-auto sm:max-w-5xl">
          <a href="#top" className="flex min-w-0 items-center">
            <img src={logo.url} alt="ConsultaOral Clínica Odontológica" className="h-11 w-11 shrink-0 scale-[2.3] rounded-full object-cover" />
            <span className="sr-only">ConsultaOral</span>
          </a>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="btn-cta inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold sm:text-sm">
            <MessageCircle className="h-4 w-4" />Agendar Consulta
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="texture-grain relative flex min-h-[100svh] items-end bg-navy-deep">
        <img src={hero.url} alt="Procedimento em clínica moderna" className="absolute inset-0 h-full w-full object-cover" />
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pt-32 pb-14 sm:pb-24">
          <div className="glass max-w-2xl rounded-3xl p-6 sm:p-10">
            <span className="glass inline-block rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-sky">Odontologia Especializada</span>
            <h1 className="on-dark mt-5 text-[2.1rem] leading-[1.1] font-semibold sm:text-6xl">
              Conheça a ConsultaOral: uma clínica pensada para garantir <em className="text-sky">saúde e a estética do seu sorriso.</em>
            </h1>
            <p className="on-dark-muted mt-5 text-[15px] leading-relaxed font-light sm:text-lg">
              Com uma equipe multidisciplinar, reunimos especialidades integradas para cuidar de você com estratégia, segurança e ética, utilizando dos melhores recursos do mercado.
            </p>
            <WaButton className="mt-7 w-full sm:w-auto">Agendar Avaliação pelo WhatsApp</WaButton>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy-gradient texture-grain">
        <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-3 px-4 py-10 lg:grid-cols-4">
          {stats.map(({ icon: I, n, t }) => (
            <div key={t} className="glass rounded-2xl p-4 text-center">
              <I className="mx-auto h-5 w-5 text-sky" />
              <div className="on-dark mt-2 font-display text-3xl font-semibold">{n}</div>
              <div className="on-dark-muted mt-1 text-[10px] font-medium uppercase leading-snug tracking-[0.15em]">{t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="texture-lines px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>Sobre a clínica</Eyebrow>
              <h2 className="mt-4 text-3xl leading-tight font-semibold text-navy sm:text-5xl">O equilíbrio entre a bagagem clínica e a constante atualização.</h2>
              <p className="mt-5 leading-relaxed font-light text-muted-foreground">
                Na ConsultaOral, entendemos que um tratamento de excelência nasce da união entre experiência e inovação. Reunimos em um mesmo ambiente a sólida trajetória da nossa fundação às abordagens mais modernas do setor. Nossa proposta é estratégica: oferecer uma visão completa e individualizada do seu caso, garantindo diagnósticos precisos, conforto e a segurança de ser atendido por quem é referência no que faz.
              </p>
            </div>
            <Carousel auto={4500} label="Fotos da clínica">
              {[c1.url, c2.url, r1.url, r3.url].map((src, k) => (
                <div key={src} className="w-full shrink-0 snap-center">
                  <img src={src} alt={`Ambiente da clínica ${k + 1}`} loading="lazy" className="shadow-soft aspect-[4/5] w-full rounded-3xl object-cover sm:aspect-[4/3]" />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {pillars.map(({ icon: I, t, d }) => (
              <div key={t} className="glass-light group rounded-3xl p-6 transition-transform hover:-translate-y-1">
                <div className="bg-navy-gradient grid h-12 w-12 place-items-center rounded-2xl"><I className="h-5 w-5 text-sky" /></div>
                <h3 className="mt-4 text-2xl font-semibold text-navy">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed font-light text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-navy-gradient texture-grain px-5 py-20">
        <div className="relative mx-auto max-w-5xl">
          <SectionHead dark eyebrow="Nossos especialistas" title="Um olhar completo para seu sorriso." sub="Diferentes especialidades trabalhando em sinergia para resolver o seu caso em um só lugar." />
          <div className="grid gap-6 md:grid-cols-3">
            {team.map((m) => (
              <article key={m.n} className="glass overflow-hidden rounded-3xl">
                <div className="relative">
                  <img src={m.img} alt={m.n} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
                  <span className="btn-cta absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold">{m.h}</span>
                </div>
                <div className="p-6">
                  <h3 className="on-dark text-2xl font-semibold">{m.n}</h3>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-sky">{m.r}</p>
                  <p className="on-dark-muted mt-3 text-sm leading-relaxed font-light">{m.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHead eyebrow="Serviços e especialidades" title="Soluções Odontológicas Integradas" sub="Atendimento completo para todas as etapas da sua saúde e estética bucal." />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ t, d }, k) => (
              <div key={t} className="glass-light relative overflow-hidden rounded-3xl border border-sky/40 p-5 transition-transform hover:-translate-y-1">
                <span className="bg-gradient-to-r from-sky to-navy absolute inset-x-0 top-0 h-1.5" />
                <span className="font-display absolute top-3 right-4 text-4xl leading-none text-sky/50">{String(k + 1).padStart(2, "0")}</span>
                <h3 className="text-navy mt-3 max-w-[80%] text-xl leading-snug font-semibold">{t}</h3>
                <p className="mt-2 text-sm font-light text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="texture-lines bg-secondary/50 px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHead eyebrow="Casos clínicos" title="Transformações e Resultados Reais" sub="Acompanhe a evolução e o rigor técnico em nossos tratamentos de Ortodontia, Harmonização Facial e Reabilitação." />
          <div className="grid gap-4 md:grid-cols-3">
            {cases.map((c) => (
              <div key={c.t} className="relative overflow-hidden rounded-3xl">
                <img src={c.img} alt={c.t} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                <div className="bg-hero-overlay absolute inset-0" />
                <div className="glass absolute inset-x-3 bottom-3 rounded-2xl p-4">
                  <h3 className="on-dark text-2xl font-semibold">{c.t}</h3>
                  <p className="on-dark-muted mt-1 text-xs font-light">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs italic text-muted-foreground">*Os resultados podem variar de acordo com as características anatômicas e o diagnóstico individual de cada paciente.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="texture-lines bg-secondary/50 px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHead eyebrow="Avaliações de pacientes" title="A experiência na ConsultaOral por quem viveu" sub="Histórias reais de pacientes atendidos na clínica, que saem do nosso consultório com o sorriso renovado e voltam — e indicam — de olhos fechados." />
          <div className="mx-auto max-w-2xl">
            <Carousel auto={4500} label="Avaliações de pacientes no Google">
              {reviews.map((r) => (
                <div key={r.img} className="w-full shrink-0 snap-center">
                  <img src={r.img} alt={`Avaliação de ${r.n} no Google`} loading="lazy" className="shadow-soft w-full rounded-3xl" />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHead eyebrow="Jornada do paciente" title="Seu Atendimento Passo a Passo" />
          <Carousel label="Etapas do atendimento" nav={false}>
            {steps.map((s, k) => (
              <div key={s.t} className="w-[85%] shrink-0 snap-center sm:w-[calc(33.333%-11px)]">
                <div className="glass-light h-full rounded-3xl p-6">
                  <span className="bg-navy-gradient on-dark grid h-12 w-12 place-items-center rounded-full font-display text-xl">{k + 1}</span>
                  <h3 className="mt-4 text-2xl font-semibold text-navy">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed font-light text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Payment */}
      <section className="px-5 pb-20">
        <div className="bg-navy-gradient texture-grain mx-auto max-w-5xl overflow-hidden rounded-[2rem] p-8 sm:p-12">
          <div className="relative">
            <Eyebrow dark>Transparência</Eyebrow>
            <h2 className="on-dark mt-4 text-3xl font-semibold sm:text-5xl">Planejamento para o seu Tratamento</h2>
            <p className="on-dark-muted mt-4 max-w-2xl font-light">Acreditamos que a saúde bucal de qualidade deve ser acessível. Trabalhamos com total transparência e oferecemos modalidades de pagamento para adequar o tratamento ao seu planejamento financeiro.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[{ i: QrCode, t: "PIX" }, { i: CreditCard, t: "Cartões de Crédito e Débito" }, { i: Banknote, t: "Dinheiro" }].map(({ i: I, t }) => (
                <div key={t} className="glass on-dark flex items-center gap-3 rounded-2xl p-4 text-sm"><I className="h-5 w-5 shrink-0 text-sky" />{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="texture-lines px-5 py-20">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Localização e contato</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold text-navy sm:text-5xl">Venha nos Conhecer</h2>
            <div className="glass-light mt-6 space-y-4 rounded-3xl p-6">
              <p className="flex gap-3 text-sm"><MapPin className="h-5 w-5 shrink-0 text-sky" />Loja embaixo do Ed. Ilhas de Kiribati, nº 345, Praia de Itaparica, Vila Velha - ES (Próximo ao Perim e La Cuchila).</p>
              <p className="flex gap-3 text-sm text-muted-foreground"><Accessibility className="h-5 w-5 shrink-0 text-sky" />Fácil acesso, localização no térreo e total acessibilidade para pessoas com deficiência.</p>
            </div>
          </div>
          <iframe title="Mapa ConsultaOral" loading="lazy" className="shadow-soft h-80 w-full rounded-3xl border-0"
            src="https://www.google.com/maps?q=Ed.+Ilhas+de+Kiribati+345+Praia+de+Itaparica+Vila+Velha+ES&output=embed" />
        </div>
      </section>


      {/* Final CTA + footer */}
      <footer className="bg-navy-gradient texture-grain px-5 pt-20 pb-10">
        <div className="relative mx-auto max-w-3xl text-center">
          <img src={logo.url} alt="ConsultaOral" className="mx-auto h-28 w-28 scale-150 object-cover" />
          <h2 className="on-dark mt-6 text-3xl leading-tight font-semibold sm:text-5xl">Pronto para cuidar do seu sorriso com quem une experiência e inovação?</h2>
          <p className="on-dark-muted mt-4 font-light">Agende sua avaliação e descubra o padrão de atendimento da ConsultaOral.</p>
          <div className="mt-8 flex justify-center">
            <WaButton>Agendar pelo WhatsApp</WaButton>
          </div>
          <a href={IG} target="_blank" rel="noopener noreferrer"
            className="shadow-soft group mt-4 flex w-full items-center gap-4 rounded-3xl bg-gradient-to-r from-sky to-sky-soft p-5 text-navy-deep transition-transform hover:-translate-y-1 sm:mt-6">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ivory">
              <Instagram className="h-7 w-7" />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block font-display text-2xl leading-tight font-semibold">Acompanhe nosso trabalho</span>
              <span className="block text-sm font-medium opacity-80">@consultaoral</span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="on-dark-muted mt-14 border-t border-sky/20 pt-6 text-[11px] leading-relaxed">
            ConsultaOral — Clínica Odontológica. Dr. Victor Nimrichter Jr (CRO-ES 7648) | Dra. Amanda Nimrichter (CRO-ES 9183) | Dra. Vívian Nimrichter (CRO-ES 11195). Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
