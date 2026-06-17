package Trust_Contract is

   type Trust_Status is (Allowed, Denied);

   function Can_Boot return Trust_Status;
   function Can_Run_Debate return Trust_Status;
   function Can_Write_Audit return Trust_Status;
   function Can_Clear_Vault(User_Confirmed : Boolean) return Trust_Status;
   function Can_Export_Snapshot return Trust_Status;
   function Can_Invoke_Lisp return Trust_Status;
   function Can_Invoke_Runtime return Trust_Status;

end Trust_Contract;
