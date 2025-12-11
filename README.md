Bu layihə Lotka-Volterra modelini istifadə edərək predator-qurban populyasiyalarının dinamikasını simulyasiya edir. Simulyasiya, populyasiyaların zamanla necə dəyişdiyini göstərən qrafiklər və parametrləri tənzimləmək üçün interaktiv idarəetmə paneli ilə təchiz edilmişdir.

## Simulyasiya Metodu

Simulyasiya `simulation.js` faylında həyata keçirilən Lotka-Volterra diferensial tənliklərinə əsaslanır. Bu tənliklər iki növ populyasiya - qurban (N) və yırtıcı (P) arasındakı dinamik qarşılıqlı əlaqəni təsvir edir. Simulyasiya Euler metodu vasitəsilə populyasiyaları addım-addım yeniləyir və onların zamanla dəyişikliklərini izləyir.

## Simulasiyanı necə işə salmaq olar

1.  `index.html` faylını veb brauzerinizdə açın.
2.  Parametrləri tənzimləmək üçün interaktiv sürgülərdən istifadə edin.
3.  Simulyasiyanı başlamaq üçün "Başlat" düyməsinə klikləyin.

Simulyasiya, qurban və yırtıcı populyasiyalarının dəyişikliklərini real vaxt rejimində qrafiklərdə göstərəcək.

## MathJax Konfiqurasiyası

Riyazi tənliklərin düzgün göstərilməsi üçün `index.html` faylında MathJax kitabxanası konfiqurasiya edilmişdir. Bu konfiqurasiya, tənliklərin veb səhifədə gözəl və oxunaqlı şəkildə təqdim olunmasını təmin edir:

```javascript
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']]
  }
};
```

## Model Haqqında
Lotka–Volterra modeli ekologiyada yırtıcı ilə qurban arasındakı qarşılıqlı təsiri sadə şəkildə izah edən riyazi yanaşmadır. Bu modeldə iki populyasiya nəzərə alınır: qurbanlar, məsələn dovşanlar, və yırtıcılar, məsələn tülkülər. Qurbanlar öz-özünə çoxalır, lakin yırtıcılar onları ovladıqca sayları azalır. Yırtıcılar isə yalnız qurbanları ovlamaqla enerji qazanır və çoxalır, amma qurban azaldıqda aclıqdan məhv olurlar. Bu qarşılıqlı təsir nəticəsində hər iki populyasiyanın sayı dövri şəkildə dalğalanır: əvvəlcə qurbanların sayı artır, sonra yırtıcıların sayı yüksəlir, ardınca qurbanlar azalır və nəticədə yırtıcılar da azalır. Beləliklə, model canlıların bir-birinə bağlı həyat dövrünü riyazi tənliklərlə ifadə edir.

## Riyazi Formul

Lotka-Volterra modelini təsvir edən diferensial tənliklər sistemi aşağıdakı kimidir:

$$\begin{cases}
\displaystyle \frac{dN}{dt} = \alpha \cdot N - \beta \cdot N \cdot P \\
\displaystyle \frac{dP}{dt} = \delta \cdot \beta \cdot N \cdot P - \gamma \cdot P
\end{cases}$$

Burada:

*   **N:** Qurbanların sayı
*   **P:** Yırtıcıların sayı
*   **$\alpha$:** Qurbanların təbii artım sürəti
*   **$\beta$:** Qurbanların yırtıcılar tərəfindən ovlanma sürəti
*   **$\gamma$:** Yırtıcıların təbii ölüm sürəti
*   **$\delta$:** Qurban sayının yırtıcıların artma sürətinə təsiri

