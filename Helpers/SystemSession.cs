namespace Avaliacao.Helpers
{
    public static class SystemSession
    {
        private static Int32 _userId;
        private static String _userToken;
        private static DateTime _userTokenValid;

        public static Int32 UserID
        {
            get { return SystemSession._userId; }
            set { SystemSession._userId = value; }
        }

        public static String UserToken
        {
            get { return SystemSession._userToken; }
            set { SystemSession._userToken = value; }
        }

        public static DateTime UserTokenValid
        {
            get { return SystemSession._userTokenValid; }
            set { SystemSession._userTokenValid = value; }
        }
    }
}
