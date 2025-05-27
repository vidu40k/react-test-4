#import "RNConfig.h"

@implementation RNConfig

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
#if DEV
  NSString *env=@"dev";
#elif STG
  NSString *env=@"stg";
#else
  NSString *env=@"prod";
#endif
  return @{ @"env":env};
}
+ (BOOL)requireMainQueueSetup
{
  return YES;
}
@end
