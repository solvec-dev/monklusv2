'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, MapPin, Phone, Mail, Clock, Hammer } from 'lucide-react';

// Voorbeeldafbeeldingen voor de carrousel (vervang deze URLs en alt-teksten gerust door jouw eigen projectfoto's)
const projecten = [
    {
        url: "./images/IMG-20260330-WA0003.jpg",
        title: "Totale Woningrenovatie",
        desc: "Hoogwaardige afwerking van een karakteristiek pand."
    },
    {
        url: "./images/IMG-20230219-WA0003.jpg",
        title: "Luxe Badkamerrenovatie",
        desc: "Modern sanitair op maat gerealiseerd."
    },
    {
        url: "./images/1.jpg",
        title: "Constructieve Uitbouw",
        desc: "Meer leefruimte en lichtinval gecreëerd."
    }
];

export default function MonklusWebsite() {
    // States voor de carrousel
    const [currentSlide, setCurrentSlide] = useState(0);

    // States voor het SMTP contactformulier
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
    const [loading, setLoading] = useState(false);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === projecten.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? projecten.length - 1 : prev - 1));
    };

    // Verzendservice naar de Gmail SMTP API-route
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: '' });

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setStatus({
                    type: 'success',
                    message: 'Uw bericht is succesvol verzonden! Wij nemen zo snel mogelijk contact met u op.'
                });
                (e.target as HTMLFormElement).reset(); // Maak invoervelden leeg
            } else {
                setStatus({
                    type: 'error',
                    message: result.message || 'Er is iets misgegaan. Probeer het later opnieuw.'
                });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Kan geen verbinding maken met de e-mailserver.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans scroll-smooth">

            {/* Navigatiebalk */}
            <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-0 text-2xl font-bold text-blue-900 tracking-wide">
                        <a href="/"><img src="./images/logo_monklus.png" className="w-full max-w-[80%] h-auto block" alt="Monklus renovatie" /></a>
                        <span><a href="/">MONKLUS</a></span>                        
                    </div>
                    <nav className="hidden md:flex space-x-8 font-medium text-slate-600">
                        <a href="#over" className="hover:text-blue-900 transition">Over Ons</a>
                        <a href="#werkzaamheden" className="hover:text-blue-900 transition">Werkzaamheden</a>
                        <a href="#projecten" className="hover:text-blue-900 transition">Projecten</a>
                        <a href="#contact" className="hover:text-blue-900 transition">Contact</a>
                    </nav>
                    <a href="#contact" className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-5 py-2.5 rounded-md font-semibold transition">
                        Offerte Aanvragen
                    </a>
                </div>
            </header>

            {/* Welkom Sectie (Hero) met achtergrondfoto */}
            <section
                className="relative bg-cover bg-center bg-no-repeat py-24 px-4 sm:px-6 lg:px-8 text-white"
                style={{
                    // Vervang 'achtergrond-hero.jpg' door de echte bestandsnaam van jouw foto
                    backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.35)), url('/images/achtergrond-hero.jpg')"
                }}
            >
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <span className="text-amber-500 font-semibold uppercase tracking-wider text-sm block mb-3">Aannemersbedrijf Den Haag</span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">Welkom bij Monklus</h1>
                    <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-4">
                        Bij Monklus geloven we dat goed vakmanschap begint met vertrouwen. Vanuit Den Haag werken wij dagelijks aan uiteenlopende bouw- en renovatieprojecten voor particulieren en bedrijven. Van kleine verbouwingen tot complete renovaties: wij combineren ervaring, kwaliteit en duidelijke communicatie om ieder project zorgvuldig uit te voeren.
                    </p>
                    <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
                        Wij staan voor degelijk werk, heldere afspraken en een nette oplevering. Dankzij onze brede ervaring binnen de bouw kunnen wij projecten van begin tot eind begeleiden. Daarbij denken we actief mee over praktische oplossingen, duurzame materialen en een afwerking die jarenlang meegaat.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#contact" className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-3.5 rounded-md font-bold text-lg transition">
                            Neem Contact Op
                        </a>
                        <a href="#werkzaamheden" className="border border-slate-400 hover:border-white text-white px-8 py-3.5 rounded-md font-bold text-lg transition">
                            Onze Diensten
                        </a>
                    </div>
                </div>
            </section>


            {/* Over Monklus */}
            <section id="over" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">Over Monklus</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Monklus is ontstaan vanuit een passie voor bouwen, renoveren en herstellen. Wat begon als gespecialiseerd vakwerk binnen onderhoud en verbouwing, is uitgegroeid tot een veelzijdig aannemersbedrijf in de regio Den Haag.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Door de jaren heen hebben wij gewerkt aan uiteenlopende projecten: van woningen en appartementen tot bedrijfspanden en restauraties. Onze kracht ligt in het combineren van traditioneel vakmanschap met moderne technieken en materialen.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        Wij begrijpen dat een verbouwing or renovatie een belangrijke investering is. Daarom vinden wij persoonlijk contact, betrouwbaarheid en transparantie minstens zo belangrijk als het eindresultaat.
                    </p>
                </div>
                <div className="bg-blue-900 text-white p-8 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-6 text-amber-400">Bij Monklus weet u waar u aan toe bent:</h3>
                    <ul className="space-y-4">
                        {['Heldere communicatie', 'Realistische planning', 'Vakmensen met ervaring', 'Oog voor detail', 'Kwaliteit die blijft'].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                                <span className="text-slate-200 font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Onze Werkzaamheden */}
            <section id="werkzaamheden" className="py-20 bg-slate-100 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-blue-900 mb-4">Onze Werkzaamheden</h2>
                        <p className="text-slate-600">Of het nu gaat om een moderne uitbouw, een complete badkamerrenovatie of het herstellen van karakteristiek metselwerk — bij Monklus staat vakwerk centraal.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { t: "Uitbouw", d: "Meer ruimte en meer wooncomfort. Wij realiseren complete uitbouwen die perfect aansluiten op de bestaande woning. Van fundering tot afwerking verzorgen wij het volledige traject." },
                            { t: "Schilderwerk", d: "Goed schilderwerk beschermt én verfraait uw woning of pand. Wij verzorgen zowel binnen- als buitenschilderwerk met hoogwaardige materialen en een duurzame afwerking." },
                            { t: "Vloeren", d: "Van strakke gietvloeren tot laminaat, pvc of tegelwerk: wij leveren vloeren die passen bij uw interieur en dagelijks gebruik." },
                            { t: "Daken", d: "Een goed dak is essentieel voor bescherming en isolatie. Wij verzorgen dakrenovaties, reparaties, dakonderhoud en complete nieuwe dakconstructies." },
                            { t: "Badkamers", d: "Wij realiseren complete badkamers op maat. Modern, praktisch en afgewerkt tot in detail — volledig afgestemd op uw wensen." },
                            { t: "Metselwerk", d: "Vakkundig metselwerk vormt de basis van iedere sterke constructie. Wij verzorgen zowel nieuw metselwerk als herstelwerkzaamheden en gevelrenovaties." },
                            { t: "Constructieve verbouwingen", d: "Bij grotere verbouwingen is deskundigheid essentieel. Wij voeren constructieve aanpassingen uit met aandacht voor veiligheid, kwaliteit en duurzaamheid." },
                            { t: "Restauratie", d: "Karakteristieke panden verdienen specialistische aandacht. Wij herstellen en renoveren bestaande elementen met respect voor de originele uitstraling van het gebouw." }
                        ].map((w, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:border-amber-500 transition duration-300">
                                <h3 className="text-lg font-bold text-blue-900 mb-2">{w.t}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{w.d}</p>
                            </div>
                        ))}
                    </div>

                    {/* Binnenkort meer */}
                    <div className="mt-12 bg-white border border-dashed border-slate-300 rounded-xl p-8 max-w-3xl mx-auto text-center">
                        <h3 className="text-xl font-bold text-blue-900 mb-3">Binnenkort meer projecten</h3>
                        <p className="text-slate-600 text-sm mb-4">Momenteel breiden wij ons portfolio verder uit met projecten op het gebied van:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {['Toiletrenovaties', 'Dakopbouwen', 'Algemene verbouwingen', 'Totaalrenovaties'].map((p, i) => (
                                <span key={i} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200">
                                    {p}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-slate-400 mt-4">Binnenkort zullen ook hiervan nieuwe foto's en projectvoorbeelden op de website verschijnen.</p>
                    </div>
                </div>
            </section>

            {/* Projecten Carrousel (Links/Rechts Navigatie) */}
            <section id="projecten" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">Gerealiseerde Projecten</h2>

                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                    <div className="relative h-[300px] sm:h-[450px] w-full">
                        <img
                            src={projecten[currentSlide].url}
                            alt={projecten[currentSlide].title}
                            className="w-full h-full object-cover transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                        {/* Tekst op afbeelding */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                            <h3 className="text-xl sm:text-2xl font-bold text-amber-400">{projecten[currentSlide].title}</h3>
                            <p className="text-sm sm:text-base text-slate-200 mt-1">{projecten[currentSlide].desc}</p>
                        </div>
                    </div>

                    {/* Navigatieknoppen */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-md transition z-10"
                        aria-label="Vorige project"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-md transition z-10"
                        aria-label="Volgende project"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Indicator stipjes */}
                    <div className="absolute top-4 right-4 bg-slate-950/60 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {currentSlide + 1} / {projecten.length}
                    </div>
                </div>
            </section>

            {/* Waarom Monklus USP Balk */}
            <section className="bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-8 text-amber-400">Waarom kiezen voor Monklus?</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
                        {[
                            "Betrouwbare partner uit Den Haag",
                            "Ervaren vakmensen",
                            "Complete begeleiding van A tot Z",
                            "Hoogwaardige afwerking",
                            "Duidelijke afspraken zonder verrassingen",
                            "Oplossingsgericht en flexibel"
                        ].map((usp, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-amber-400 shrink-0" />
                                <span className="text-slate-100 text-sm font-medium">{usp}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact & Formulier */}
            <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-5 gap-12">
                <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">Neem contact op</h2>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        Bent u op zoek naar een betrouwbare aannemer voor uw verbouwing, renovatie of onderhoud? Monklus helpt u graag verder. Neem vrijblijvend contact met ons op voor advies, een offerte of een kennismakingsgesprek.
                    </p>

                    <div className="space-y-4 font-medium text-slate-700">
                        <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-amber-500" />
                            <span>Regio Den Haag (Gevestigd in Den Haag)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-amber-500" />
                            <span>Telefoonnumer</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-amber-500" />
                            <span>info@monklus.nl</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-amber-500" />
                            <span>Maandag t/m Vrijdag: 09:00 - 17:00</span>
                        </div>
                    </div>
                </div>

                {/* Contactformulier */}
                <div className="md:col-span-3 bg-white p-8 rounded-xl shadow-md border border-slate-100">
                    <h3 className="text-xl font-bold text-blue-900 mb-6">Bericht sturen</h3>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Naam *</label>
                            <input type="text" name="name" required className="w-full px-4 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:border-blue-950 bg-slate-50" />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">E-mailadres *</label>
                                <input type="email" name="email" required className="w-full px-4 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:border-blue-950 bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Telefoonnummer</label>
                                <input type="tel" name="phone" className="w-full px-4 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:border-blue-950 bg-slate-50" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Uw bericht / Renovatieplannen *</label>
                            <textarea name="message" rows={4} required className="w-full px-4 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:border-blue-950 bg-slate-50"></textarea>
                        </div>

                        {/* Dynamische Statusmeldingen voor de klant */}
                        {status.type && (
                            <div className={`p-4 rounded-md text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                                {status.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3 px-6 rounded-md transition duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Verzenden...' : 'Verzenden'}
                        </button>
                    </form>
                </div>
            </section>

            {/* Voettekst */}
            <footer className="bg-slate-900 text-slate-400 py-8 px-4 border-t border-slate-800 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Monklus. Alle rechten voorbehouden. Gevestigd te Den Haag.</p>
            </footer>
        </div>
    );
}
