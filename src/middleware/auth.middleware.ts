
// Express içerisinden gerekli TypeScript tiplerini import ediyoruz.
// Request: Gelen HTTP isteğini temsil eder.
// Response: İstemciye gönderilecek cevabı temsil eder.
// NextFunction: Bir sonraki middleware'e geçmemizi sağlar.
import type { Request, Response, NextFunction } from "express";

// JWT token oluşturma, doğrulama ve çözümleme işlemleri için kullanılır.
import jwt from "jsonwebtoken";


// JWT token içerisinden elde edeceğimiz kullanıcı bilgilerinin tipini tanımlıyoruz.
interface JwtPayload {
    userId: string;
    role: string;
}


// Express'in Request tipini genişletiyoruz.
// Böylece doğrulanan kullanıcı bilgilerini req.user içerisinde saklayabiliriz.
// user?: Kullanıcı bilgisi henüz eklenmemiş olabilir.
export interface AuthRequest extends Request {
    user?: JwtPayload;
}


// Authentication işlemini gerçekleştiren middleware fonksiyonunu oluşturuyoruz.
export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {

    try {

        // İstek içerisindeki Authorization header bilgisini alıyoruz.
        // Örnek: Authorization: Bearer eyJhbGciOiJIUzI1Ni...
        const authHeader = req.headers.authorization;


        // Authorization header yoksa veya Bearer ile başlamıyorsa
        // kullanıcının token göndermediğini kabul ediyoruz.
        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            // 401 Unauthorized durum koduyla cevap gönderiyoruz.
            res.status(401).json({
                success: false,
                message: "Authentication token is required."
            });

            // İşlemi sonlandırıyoruz.
            return;
        }


        // Authorization bilgisini boşluk karakterine göre ayırıyoruz.
        // Örnek: ["Bearer", "eyJhbGciOiJIUzI1Ni..."]
        // [1] kullanarak JWT token değerini alıyoruz.
        const token = authHeader.split(" ")[1];


        // Token değeri boş veya undefined ise
        // geçersiz token formatı hatası döndürüyoruz.
        if (!token) {

            res.status(401).json({
                success: false,
                message: "Invalid token format."
            });

            return;
        }


        // JWT token'ın imzasını ve geçerlilik süresini kontrol ediyoruz.
        // JWT_ACCESS_SECRET, token oluşturulurken kullanılan gizli anahtardır.
        // Token geçerliyse içerisindeki payload bilgisini döndürür.
        // Token geçersizse hata fırlatır.
        const decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET!
        ) as JwtPayload;


        // Token içerisinden elde ettiğimiz kullanıcı bilgilerini
        // Request nesnesine ekliyoruz.
        // Böylece sonraki middleware ve controller'larda req.user
        // üzerinden kullanıcı bilgilerine ulaşabiliriz.
        req.user = decoded;


        // Token doğrulaması başarılı.
        // Bir sonraki middleware veya controller'a geçiyoruz.
        next();


    } catch (error) {

        // Token'ın geçerlilik süresi dolmuşsa
        // TokenExpiredError yakalanır.
        if (error instanceof jwt.TokenExpiredError) {

            res.status(401).json({
                success: false,
                message: "Token has expired."
            });

            return;
        }


        // Token hatalı, bozuk veya imzası geçersizse
        // JsonWebTokenError yakalanır.
        if (error instanceof jwt.JsonWebTokenError) {

            res.status(401).json({
                success: false,
                message: "Invalid token."
            });

            return;
        }


        // Yukarıdaki JWT hataları dışında beklenmeyen bir hata oluşursa
        // hatayı Express'in global error middleware'ine iletiyoruz.
        next(error);
    }
};
