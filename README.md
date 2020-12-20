# GeKo: Gençlere Kodlama

## Hedef

Kendimi oğlum dahil birkaç 5. sınıf öğrencisine kodlama öğretmeye çalışırken buldum. Daha önce 8-12 sınıflara eğitim verme deneyimim olmuştu ama bunların becerileri farklı, İngilizce okuma/anlama/yazma düzeyleri farklı. Bu yüzden (1) öncelikle İngilizce engeli olmadan okuyup yazabilecekleri bir kodlama ortamı gerekiyor, (2) ayrıca zihinsel beceri ve bilgi birikimlerine uygun konulardan oluşan birkaç günlük bir müfredat gerekiyor. Bu yüzden böyle bir proje yapmak istedim.

Daha önce lise ve üniversite  öğrencilerine kodlama başlangıç dili olarak Scheme öğrettim. Ancak daha küçük yaş grubunda fonksiyon kavramının anlaşılması kolay değil. Bu yüzden kendini kanıtlamış Turtle/Logo programlama ile başlamayı düşünüyorum. Bunun içib de turtle'ı JavaScript diliyle kullanacakları (erişim kolaylığı) bir giriş müfredatı hazırlamayı düşünüyorum. (Devamında Scheme olabilir) 

Başlangıç müfredatının altyapısı için p5.js üzerinde yapılmış bir turtle kitaplığını uyarlamaya çalıştım: https://ycatch.github.io/p5.turtle.js/ 

## Sistem Mimarisi

Öncülü olan Processing gibi p5 sistemi de animasyon esaslı hazırlanmıştır. Tüm kod geko.js içerisindedir. HTML sayfasında "editor" isimli bir textarea ve "p5canvas" isimli bir canvas nesnesi bulunmalıdır. Sayfa yüklendiğinde çalışan run() fonksiyonu editördeki koda dayalı çizimi başlatır. Bu sırada oluşturulan p5 nesnesi sonrasında draw() fonksiyonu ile "frame" değişkeninde numarası verilen her bir kareyi çizmektedir.

Daha çizim başlamadan kod alanı içerisinde kullanılan fonksiyonlar eval() ile çalıştırılarak bir "stack" nesnesi içerisinde her adımda yapılacak çizim adımlarını ekler. "stack" adlı bu listede (movetype,moveval) yapısında nesneler dizilidir. Örneğin "ileri(x)" gibi bir komut geko.js'te bulunan ileri() fonksiyonunu çağırarak stack'e şunu ekler: ("move", x%speed). (Burada speed ekrandaki "hız" kutusundan alınan bir değişkendir.). Dolayısıyla sisteme yeni çizim komutları geko.js içine birer fonksiyon olarak eklenebilir; komutun niteliğine göre stack'e neler ekleyeceği belirlenir.

"stack" nesneleri sistemin temel çizim bytecode'u gibidir. Şu nesneler tanımlanmıştır (draw fonksiyonu tarafından desteklenen):

* "move", mesafe
* "jump", mesafe
* "turn", açı : saat yönüne ve derece cinsindendir