using Avaliacao.Models;

namespace Avaliacao.Helpers
{
    public static class BCryptHash
    {
        public static string generateHash(User user)
        {
            return BCrypt.Net.BCrypt.HashPassword(user.Password);
        }

        public static bool verifyHash(string password, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
    }
}
